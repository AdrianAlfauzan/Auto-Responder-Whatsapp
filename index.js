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

  if (msg.body.toLowerCase() === "halo") {
    msg.reply("Halo! Ada yang bisa saya bantu? 😊");
  } else if (msg.body.toLowerCase().includes("harga")) {
    msg.reply("Silakan cek harga produk kami di website: https://example.com");
  }
});

client.initialize();
