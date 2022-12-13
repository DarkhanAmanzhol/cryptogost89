import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [plainText, setPlainText] = useState("");
  const [cipherText, setCipherText] = useState("");

  const [encryptedText, setEncryptedText] = useState("");
  const [decryptedText, setDecryptedText] = useState("");

  const [keyEncrypt, setKeyEncrypt] = useState("");
  const [keyDecrypt, setKeyDecrypt] = useState("");

  const handlePlainTextChange = (event) => {
    setPlainText(event.target.value);
  };
  const handleCipherTextChange = (event) => {
    setCipherText(event.target.value);
  };
  const handleKeyEncryptChange = (event) => {
    setKeyEncrypt(event.target.value);
  };
  const handleKeyDecryptChange = (event) => {
    setKeyDecrypt(event.target.value);
  };

  const encryptMessage = async () => {
    const response = await axios.post("http://localhost:5000/api/encrypt", {
      text: plainText,
      key: keyEncrypt,
    });

    setEncryptedText(response.data.str);
  };
  const decryptMessage = async () => {
    const response = await axios.post("http://localhost:5000/api/decrypt", {
      text: cipherText,
      key: keyDecrypt,
    });

    setDecryptedText(response.data.str);
  };

  return (
    <div className='App container'>
      <h1>Gost 89</h1>
      <div className='row'>
        <div className='col-md-6'>
          <h3>Encrypt the message</h3>
          <textarea
            id='encryption'
            value={plainText}
            onChange={handlePlainTextChange}
            type='text'
            rows='5'
            cols='33'
          />
          <br />
          <span>Key:</span>
          <input
            type='text'
            value={keyEncrypt}
            onChange={handleKeyEncryptChange}
          />
          <br />
          <button onClick={encryptMessage}>Encrypt</button>
          <br />
          <textarea
            id='encryption'
            value={encryptedText}
            type='text'
            rows='5'
            cols='33'
          />
        </div>
        <div className='col-md-6'>
          <h3>Decrypt the message</h3>
          <textarea
            id='decryption'
            value={cipherText}
            onChange={handleCipherTextChange}
            type='text'
            rows='5'
            cols='33'
          />
          <br />
          <span>Key:</span>
          <input
            type='text'
            value={keyDecrypt}
            onChange={handleKeyDecryptChange}
          />
          <br />
          <button onClick={decryptMessage}>Decrypt</button>
          <br />
          <textarea
            id='encryption'
            value={decryptedText}
            type='text'
            rows='5'
            cols='33'
          />
        </div>
      </div>
    </div>
  );
}

export default App;
