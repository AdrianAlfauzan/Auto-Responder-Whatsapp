const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

// Web server agar Railway menjaga bot tetap online
app.get("/", (req, res) => {
  res.send("✅ WhatsApp Bot is running!");
});
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});

// Inisialisasi bot WhatsApp
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
});

client.on("qr", (qr) => {
  console.log("📌 Scan QR Code ini di WhatsApp Web:");
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("✅ Bot WhatsApp sudah online 24 jam!");
});

client.on("message", (msg) => {
  console.log(`📩 Pesan dari ${msg.from}: ${msg.body}`);

  const pesan = msg.body.toLowerCase(); // Ubah ke huruf kecil biar case-insensitive

  if (pesan === "Доброе утро коть❤") {
    msg.reply("Доброе утро ❤");
  } else if (pesan.includes("iyan")) {
    msg.reply("uy knp?");
  } else if (pesan.includes("P")) {
    msg.reply("uy knp?");
  } else if (pesan === "p") {
    msg.reply("Iya apa? ");
  } else if (pesan === "assalamualaikum") {
    msg.reply("Waalaikumsalam");
  } else if (pesan === "Доброе утро ❤") {
    msg.reply("Доброе утро ❤");
  } else if (pesan === "Ты как коть?") {
    msg.reply("Намана,Ты как?");
  } else if (pesan === "Ничего") {
    msg.reply("Aaaa okay");
  } else {
    msg.reply("I'm sorry, i am not understand! please ask me again 🤖");
  }
});

client.initialize();
