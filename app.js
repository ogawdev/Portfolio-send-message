require("dotenv").config();
const express = require("express");
const TelegramBot = require("node-telegram-bot-api");
const cors = require("cors");
const app = express();

const bot = new TelegramBot(process.env.TOKEN, {
  polling: true,
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/", async (req, res) => {
  try {
    const { userId, phone, message, name } = req.body;
    console.log(userId, phone, message, name);

    await bot.sendMessage(
      userId,
      `Name: ${name}\nPhone: ${phone}\nMessage: ${message}`,
      { parse_mode: "HTML" }
    );

    res.status(200).json({
      message: "Success",
    });
  } catch (err) {
    console.error(err);
    res.status(404).json({
      message: err + "",
    });
  }
});

app.listen(process.env.PORT || 3000, () =>
  console.log("Server listening on port", process.env.PORT || 3000)
);
