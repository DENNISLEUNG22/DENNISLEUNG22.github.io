import express from "express";
import { client } from "./env";
import "./session";
import { hashPassword } from "./hash";
import { checkPassword } from "./hash";
import { form, formObjectToArray, formParse } from "./formtableUtilis";
import path from "path";

export let userRoutes = express.Router();

export type User = {
  username: string;
  email: string;
  password: string;
  age: string;
  gender: string;
  phone: number;
  profile_icon?: string;
};

// -----------------------update Personal Information-----------------------------------------
userRoutes.post("/updateBasicInfo", async (req, res) => {
  try {
    // ----------------------upload photo------------------------------
    const { fields, files } = await formParse(form, req);
    const filesArray = formObjectToArray(files as any);
    let loginUser = req.session.user!.id;
    if(Array.isArray(fields.phone)) return
    let username = fields.username;
    let age = fields.age;
    let gender = fields.gender;
    let phone = fields.phone;
    let numberOnly = /^\d+$/;
    let avatar = null
    
    if (filesArray[0].profile_icon) avatar = filesArray[0].profile_icon.newFilename;
    
    // ------------------^^^^upload photo------------------------------
    if (!phone.match(numberOnly)) {
      res.status(400).json({ message: "聯絡電話只可以數字呀～" });
      return;
    }
    if (!username || !age || !gender || !phone) {
      res.status(400).json({ message: "仲有未輸入既資訊～" });
      return;
    }
    await client.query(
      /* sql */ `UPDATE users SET username = $1 ,age = $2, gender= $3, phone= $4, profile_icon = $5 WHERE id = $6`,
      [username, age, gender, phone, avatar, loginUser]
    );
    res.json({ message: "成功更新帳戶資料啦～" });
  } catch (error) {
    console.log("error: ", error);
    res.json({ message: error });
  }
});

// -----------------------update Password-----------------------------------------
userRoutes.post("/updatePW", async (req, res) => {
  let { password } = req.body;
  let hashedPassword = await hashPassword(password);
  try {
    let loginUser = req.session.user!.id;
    await client.query(
      /* sql */ `UPDATE users SET password = $1  WHERE id = $2`,
      [hashedPassword, loginUser]
    );
    res.json({ message: "成功更新密碼" });
  } catch (error) {
    console.log("error: ", error);
    res.json(error);
  }
});

// -----------------------Update email-----------------------------------------
userRoutes.post("/updateEmail", async (req, res) => {
  let { email } = req.body;
  try {
    let eEmailChecker = await client.query(
      /* sql */ `SELECT * FROM users WHERE email = $1`,
      [email]
    );
    if (eEmailChecker.rows.length > 0) {
      res.json({ message: "輸入電郵已經註冊過" });
      return;
    }
    let loginUser = req.session.user!.id;
    await client.query(/* sql */ `UPDATE users SET email = $1 WHERE id = $2`, [
      email,
      loginUser,
    ]);
    res.json({ message: "成功更新電郵" });
  } catch (error) {
    console.log("error: ", error);
    res.json(error);
  }
});

// -----------------------Register-----------------------------------------
userRoutes.post("/register", async (req, res) => {
  let { username, email, password, age, gender, phone, profile_icon } =
    req.body;
  let hashedPassword = await hashPassword(password); 
       let ppphone  = parseInt(phone)  
       console.log(typeof ppphone);  
       console.log( ppphone);  

  try {
    if (!email || !password || !username || !age || !gender || !ppphone) {
      res.status(400);
      res.json({ message: "尚有未輸入資訊" });
      return;
    }
    if (typeof ppphone !== "number") {
      res.status(400);
      res.json({ message: "聯絡電話只能輸入數字" });
      return;
    }
    // ----------------------------check email------------------------------------
    let existingEmailChecker = await client.query(
      /* sql */ `SELECT * FROM users WHERE email = $1`,
      [email]
    );
    if (existingEmailChecker.rows.length > 0) {
      res.status(400);
      res.json({ message: "輸入電郵已經註冊過" });
      return;
    }
    // ----------------------------check email------------------------------------

    await client.query(
      /* sql */ `INSERT INTO users (username,email,password,age,gender,phone,profile_icon) VALUES ($1,$2,$3,$4,$5,$6,$7)`,
      [
        username,
        email,
        hashedPassword,
        age,
        gender,
        phone,
        profile_icon || null,
      ]
    );
    res.json({ message: "成功建立帳戶" });
    // res.redirect('/')
  } catch (error) {
    console.log("error: ", error);
    res.json(error);
  }
});

// -----------------------Login-----------------------------------------
userRoutes.post("/login", async (req, res) => {
  console.log(req.body);

  let { email } = req.body;
  let password: string = req.body.password;
  try {
    if (!email) {
      res.status(400);
      res.json({ message: "未輸入電郵" });
      return;
    }
    if (!password) {
      res.status(400);
      res.json({ message: "未輸入密碼" });
      return;
    }
    let result = await client.query(
      /* sql */ `select id, password from users where email = $1`,
      [email]
    );
    let user = result.rows[0];
    if (!user) {
      res.status(400);
      res.json({ message: "此電郵尚未註冊" });
      return;
    }
    const match = await checkPassword(password, user.password);
    if (!match) {
      res.status(400);
      res.json({ message: "錯誤電郵／錯誤密碼" });
      return;
    }
    req.session.user = {
      id: user.id,
      username: user.username,
      email: user.email,
      age: user.age,
      gender: user.gender,
      phone: user.phone,
      profile_icon: user.profile_icon,
    };
    req.session.save();
    res.json({ message: "Login success" });
    // res.json("Login success");
  } catch (error) {
    res.status(500);
    console.log(error);
    res.json({ error: String(error) });
  }
});


// -----------------------Logout----------------------------------------
userRoutes.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(502);
      res.end("Failed to destroy session");
    } else {
      res.redirect("/");
    }
  });
});



// -----------------------Call Current User-----------------------------------------
userRoutes.get("/currentUser", async (req, res) => {
  try {
    const id = req.session.user!.id;
    let result = await client.query(
      /* sql */ `select * from users where id=$1`,
      [id]
    );
    let currentUserinfo = result.rows[0];
    res.json(currentUserinfo);
  } catch (error) {
    res.status(500);
    res.json({ error: String(error) });
  }
});
// -----------------------Change Role----------------------------------------
userRoutes.get('/role.css', (req, res) => {
  if (req.session.user) {
    res.sendFile(path.resolve(path.join('public', 'admin.css')))
  } else {
    res.sendFile(path.resolve(path.join('public', 'guest.css')))
  }
})