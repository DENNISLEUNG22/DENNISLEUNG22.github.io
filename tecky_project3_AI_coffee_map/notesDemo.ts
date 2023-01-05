import "playwright";
import { chromium } from "playwright";

// //---------- example without MVC
// //--1
// async function main() {
//   let browser = await chromium.launch({ headless: false });
//   let page = await browser.newPage();
//   //method-1: await page.goto("https://www.openrice.com/en/hongkong/restaurants/district/tsuen-wan");
//   await collectByDistrict(page, "tsuen-wan");
// }

// //--2 create function to get the district and put into url
// //can br more flexible to change the filter result
// async function collectByDistrict(page: Page, district: string) {
//   let url = "https://www.openrice.com/en/hongkong/restaurants/district/" + district;
// }
// //end of example without MVC

//---------- example with MVC
//--1
async function main() {
  let browser = await chromium.launch({ headless: false });
  let page = await browser.newPage();
  let collector = new Collector(page);
  await collector.collectByDistrict("tsuen-wan");
}

class Collector {
  constructor(private page: Page) {}

  async collectByDistrict(district: string) {
    let { page } = this;
    let url =
      "https://www.openrice.com/en/hongkong/restaurants/district/" + district;
    //--5 {waitUntil: 'domcontentloaded'} = 唔洗等個網load廣告, 直接load DOM
    await page.goto(url, { waitUntil: "domcontentloaded" });

    //--3 get the shop list
    //evaluate: run on browser
    //inspector: <div id="or-route-poi-list-main"><ul class="pois-restaurant-list">...</ul></div>
    let items = await page.evaluate(() => {
      // //*below method is not work due to many li in the div
      // //攞 div 裡邊的 ul, 而 ul 的 class 有 pois-restaurant-list
      // let ul = document.querySelector(
      //   "#or-route-poi-list-main ul.pois-restaurant-list"
      // );
      // if (!ul) throw new Error("failed to find restaurant list");
      // console.log("ul:", ul);
      // //debugger = browser 行到呢句就停
      // //debugger;

      // //--4 攞 ul 裡邊的 array = li, li, li
      // return Array.from(ul.children, (li) => {
      //   //攞 li 裡邊的 <h2 class="title-name"> 的文字
      //   let name = li.querySelector(".title-name")?.textContent?.trim();
      //   if (!name) throw new Error("failed to find restaurant name");

      //   //攞 li 裡邊的 <h2 class="title-name"> 裡邊的 <a href="...">
      //   let url = li.querySelector<HTMLAnchorElement>(".title-name a")?.href;
      //   if (!url) throw new Error("failed to find restaurant url");
      //   //*END: below method is not work due to many li in the div

      //--7 直接攞 div 裡邊的 ul, 而 ul 的 class 有 pois-restaurant-list 的所有li
      return Array.from(
        document.querySelectorAll(
          "#or-route-poi-list-main ul.pois-restaurant-list > li"
        ),
        (li) => {
          console.log("li:", li);
          let name = li.querySelector(".title-name")?.textContent?.trim();
          if (!name) throw new Error("failed to find restaurant name");
          let url = li.querySelector<HTMLAnchorElement>(".title-name a")?.href;
          if (!url) throw new Error("failed to find restaurant url");

          //--/7
          console.log("name:", name);
          console.log("url:", url);

          return { name, url };
        }
      );
      //--/4
    });
    //--6 for-loop to click the url form <div>
    for (let item of items) {
      //goto original url and click to reviews part
      let url = item.url + "/reviews";
      await page.goto(item.url, { waitUntil: "domcontentloaded" });
      // return;

      //--8
      await page.evaluate(() => {
        //一個留言都係div, 而裡邊都有data-review-id
        return Array.from(
          document.querySelectorAll("[data-review-id][itemprop=review]"),
          (div) => {
            //攞 itemprop=author 的 a link
            let a = div.querySelector<HTMLAnchorElement>(
              ".[itemprop=author] a"
            );
            if (!a) throw new Error("failed to find author");
            //有就search href 裡邊的 'userid' 的字眼
            let user_id = new URLSearchParams(new URL(a.href).search).get(
              "userid"
            );
            let nickname = a.querySelector("[itemprop=name]")?.textContent;
            //<div class="read-more-btn"> = btn in div
            div.querySelector<HTMLDivElement>(".read-more-btn")?.click;
          }
        );
      });
    }
    //run on server
    console.log("items:", items);
  }
}

main().catch((e) => console.log(e));
