const gost89 = require("gost89");

const convert = (from, to) => (str) => Buffer.from(str, from).toString(to);
const utf8ToHex = convert("latin1", "hex");
const hexToUtf8 = convert("hex", "latin1");

function encryptMessage(myText, myKey) {
  var ctx = gost89.init();

  let msgInHex = "",
    msgInStr = "";
  for (i = 0; i < Math.ceil(myText.length / 16); i++) {
    var key = Buffer.from(utf8ToHex(myKey), "hex");
    var clear = Buffer.from(
      utf8ToHex(myText.slice(i * 16, i * 16 + 16)),
      "hex"
    );
    var out = Buffer.alloc(16);

    var iv = Buffer.from("F1F2F3F4F5F6F7F8", "hex");

    ctx.key(key);
    ctx.crypt_cfb(iv, clear, out);

    msgInHex += out.toString("hex");
    msgInStr += out.toString("latin1");
  }

  msgInStr = msgInStr.slice(0, myText.length);

  return { hex: msgInHex, str: msgInStr };
}

function decryptMessage(myCypher, myKey) {
  var ctx = gost89.init();

  let msgInHex = "",
    msgInStr = "";
  for (i = 0; i < Math.ceil(myCypher.length / 16); i++) {
    var key = Buffer.from(utf8ToHex(myKey), "hex");
    var cypher = Buffer.from(
      utf8ToHex(myCypher.slice(i * 16, i * 16 + 16)),
      "hex"
    );
    var out = Buffer.alloc(16);

    var iv = Buffer.from("F1F2F3F4F5F6F7F8", "hex");

    ctx.key(key);
    ctx.decrypt_cfb(iv, cypher, out);

    msgInHex += out.toString("hex");
    msgInStr += out.toString("latin1");
  }

  msgInStr = msgInStr.slice(0, myCypher.length);

  return { hex: msgInHex, str: msgInStr };
}

module.exports = { encryptMessage, decryptMessage };
