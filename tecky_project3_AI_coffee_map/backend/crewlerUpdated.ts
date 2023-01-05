//finial version!!!!
//crawler.ts is only for testing
//this will scrapping from google which filter with "coffee hong kong"

import { chromium } from "playwright";
import "cast.ts";
import Knex from "knex";
const knexConfig = require("./knexfile");
export const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);

// import { id, optional, string, int } from "cast.ts";
// import { time } from "console";
// import { proxy } from "./proxy";
// import { filter, find } from "better-sqlite3-proxy";

// let shopParser = Object({
//   id: id(),
//   address: string({ trim: true, minLength: 1 }),
//   latlng: optional(int({ min: 1 })),
//   start_time: time,
//   end_time: time,
//   tel: optional(int({ min: 1 })),
//   owner_id: optional(int({ min: 1 })),
// });

async function main() {
  let browser = await chromium.launch({ headless: false });
  let page = await browser.newPage();
  await page.goto("https://www.google.com/maps/search/coffee+kowloon+bay");

  async function hasEnd() {
    return page.evaluate(() => {
      let span = Array.from(
        document.querySelectorAll("[data-js-log-root] span")
      ).find(
        (span) =>
          span.textContent?.includes("你已看完所有搜尋結果。") ||
          span.textContent?.includes("You've reached the end of the list.")
      );
      return !!span;
    });
  }

  async function scrollToLastItem() {
    return page.evaluate(() => {
      let items = Array.from(
        document.querySelectorAll<HTMLAnchorElement>("div[data-js-log-root] a"),
        (a) => {
          let parts = new URL(a.href).pathname.split("/").pop()?.split("!");
          console.log("parts: ", parts);
          if (parts?.length == 1) {
            // booking button
            return { a };
          }
          let lat = parts?.[5];
          let lng = parts?.[6];
          if (!(lat?.startsWith("3d") && lng?.startsWith("4d"))) {
            console.log({ a, parts, lat, lng });
            throw new Error("failed to parse cafe lat lng");
          }

          let pos = [+lat.slice(2), +lng.slice(2)];
          let name = a.getAttribute("aria-label");

          if (!name) {
            throw new Error("failed to find cafe name");
          }
          let text = a.parentElement?.innerText;
          let lines = text?.split("\n") || [];

          console.log(lines);

          if (lines[0] === "廣告") {
            return { a };
          }

          let rating = parseFloat(lines[1]);
          let address = lines[2];
          if (!lines[3].includes("營業")) {
            address += "\n" + lines[3];
          }
          address = address
            .trim()
            .replace("咖啡廳", "")
            .replace("咖啡店", "")
            .replace("·", "");
          let is24 = lines.some((line) => line.includes("24 小時營業"));
          let isStay = lines.some((line) => line.includes("堂食"));
          let isTakeAway = lines.some((line) => line.includes("外賣自取"));
          let isDelivery = lines.some((line) => line.includes("送貨/外送服務"));
          let startTime = lines
            .find((line) => line.includes("開始營業時間"))
            ?.split("：")
            .pop();
          let endTime = lines
            .find((line) => line.includes("結束營業時間"))
            ?.split("：")
            .pop();

          let json = {
            pos,
            name,
            rating,
            address,
            is24,
            isStay,
            isTakeAway,
            isDelivery,
            startTime,
            endTime,
            a,
            lines,
          };

          return json;
        }
      );

      let scrollVal = 0;

      let last = items.at(-1);
      console.log("last", last);

      window.scrollTo(0, scrollVal);
      scrollVal += 80;

      last?.a.scrollIntoView({ behavior: "auto" });
      return items;
    });
  }

  for (;;) {
    // console.log("loop");
    if (await hasEnd()) {
      break;
    }
    let items = await scrollToLastItem();
    console.log(items.pop());
    console.log("-------------------");

    const singleItems: any = items.pop();

    let itemSize = Object.keys(singleItems).length;

    if (itemSize <= 1) {
      continue;
    }

    await sleep(3000);
  }

  console.log("end");
  let items = await scrollToLastItem();

  // console.log(items);
  // console.log("-------------------");

  for (let singleItems of items) {
    if (!("address" in singleItems)) continue;

    let row = await knex("shop")
      .select("id")
      .where({ address: singleItems.address })
      .first();

    let shop = {
      //new add name
      name: singleItems.name,
      address: singleItems.address,
      latlng: knex.raw(`point(${singleItems.pos[0]}, ${singleItems.pos[1]})`),
      start_time: singleItems.startTime,
      end_time: singleItems.endTime || "",
    };

    if (row) {
      await knex("shop").update(shop).where({ id: row.id });
    } else {
      await knex("shop").insert(shop);
    }

    //   if (!item.name) {
    //     continue;
    //   }

    //   console.log("insert", item);
    //   try {
    //     let shop = shopParser.parse(item);

    //     console.log(shop);

    //     // Proxy.shop[shop.id] = {
    //     //   address: shop.address,
    //     //   latlng: shop.latlng,
    //     //   start_time: shop.start_time || null,
    //     //   end_time: shop.end_time || null,
    //     //   tel: shop.tel || null,
    //     //   owner_id: shop.owner_id || null,
    //     // };
    //   } catch (error) {
    //     console.log("invalid to insert", { error: item });
    //   }
  }
  await page.close();
  await browser.close();
}
main().catch((e) => {
  console.error(e);
});

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
