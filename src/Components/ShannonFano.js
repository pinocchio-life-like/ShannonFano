import React, { useState } from "react";
import "./ShannonFano.css";

const ShannonFano = () => {
  const [encodingInputText, setEncodingInputText] = useState("");
  const [decodingInputText, setDecodingInputText] = useState("");
  const [encodedText, setEncodedText] = useState("");
  const [decodedText, setDecodedText] = useState("");
  const [encodingMap, setEncodingMap] = useState({});

  const encodeText = () => {
    const symbolFrequencies = {};
    for (let i = 0; i < encodingInputText.length; i++) {
      const symbol = encodingInputText[i];
      if (symbol in symbolFrequencies) {
        symbolFrequencies[symbol]++;
      } else {
        symbolFrequencies[symbol] = 1;
      }
    }

    const sortedSymbols = Object.keys(symbolFrequencies).sort(
      (a, b) => symbolFrequencies[b] - symbolFrequencies[a]
    );

    const generateCodes = (symbols, prefix) => {
      if (symbols.length === 1) {
        return { [symbols[0]]: prefix };
      }

      const mid = Math.ceil(symbols.length / 2);
      const leftSymbols = symbols.slice(0, mid);
      const rightSymbols = symbols.slice(mid);

      const leftEncodingMap = generateCodes(leftSymbols, prefix + "0");
      const rightEncodingMap = generateCodes(rightSymbols, prefix + "1");

      return { ...leftEncodingMap, ...rightEncodingMap };
    };

    const encodingMap = generateCodes(sortedSymbols, "");
    setEncodingMap(encodingMap);

    let encodedText = "";
    for (let i = 0; i < encodingInputText.length; i++) {
      const symbol = encodingInputText[i];
      encodedText += encodingMap[symbol];
    }

    setEncodedText(encodedText);
  };

  const decodeText = () => {
    const filteredDecodingInputText = decodingInputText.replace(/[^01]/g, "");
    setDecodingInputText(filteredDecodingInputText);

    const reverseEncodingMap = {};
    for (let symbol in encodingMap) {
      const code = encodingMap[symbol];
      reverseEncodingMap[code] = symbol;
    }

    let decodedText = "";
    let currentCode = "";
    for (let i = 0; i < filteredDecodingInputText.length; i++) {
      currentCode += filteredDecodingInputText[i];
      if (currentCode in reverseEncodingMap) {
        decodedText += reverseEncodingMap[currentCode];
        currentCode = "";
      }
    }

    setDecodedText(decodedText);
  };

  return (
    <div className="shannon-fano-container dark-theme">
      <h1 className="title">Shannon-Fano Encoding and Decoding</h1>
      <div
        style={{
          display: "flex",
          width: "800px",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 40,
        }}>
        <div className="input-field">
          <label htmlFor="encoding-input">Input for Encoding:</label>
          <input
            id="encoding-input"
            type="text"
            className="input-text"
            value={encodingInputText}
            onChange={(e) => setEncodingInputText(e.target.value)}
          />
        </div>
        <button className="btn-encode" onClick={encodeText}>
          Encode
        </button>
        <div className="encoded-text">
          <label>Encoded Text:</label>
          <p className="output">{encodedText}</p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          width: "800px",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
        <div className="input-field">
          <label htmlFor="decoding-input">Input for Decoding:</label>
          <input
            id="decoding-input"
            type="text"
            className="input-text"
            value={decodingInputText}
            onChange={(e) => setDecodingInputText(e.target.value)}
          />
        </div>

        <button className="btn-decode" onClick={decodeText}>
          Decode
        </button>
        <div className="decoded-text">
          <label>Decoded Text:</label>
          <p className="output">{decodedText}</p>
        </div>
      </div>
    </div>
  );
};

export default ShannonFano;
