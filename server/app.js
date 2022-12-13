const express = require("express");
const path = require("path");
const cors = require("cors");
const { encryptMessage, decryptMessage } = require("./gost");

const app = express();

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "public")));
app.get(/.*/, (req, res) =>
  res.sendFile(path.join(__dirname, "public", "index.html"))
);

app.post("/api/encrypt", (req, res) => {
  const text = req.body.text;
  const key = req.body.key;

  const newData = encryptMessage(text, key);
  return res.json(newData);
});
app.post("/api/decrypt", (req, res) => {
  const text = req.body.text;
  const key = req.body.key;

  const newData = decryptMessage(text, key);
  return res.json(newData);
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server launched on port ${port}`);
});
