"use client";
import React, { useState } from "react";

import "./styles/globals.css";
import confetti from "canvas-confetti";

//const confetti = require("canvas-confetti");
const IndexPage = () => {
  const [fromCountry, setFromCountry] = useState("");
  const [toCountry, setToCountry] = useState("USD"); // Defaulting to USD
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState("");
  const [exchangeRate, setExchangeRate] = useState(""); // New state for exchange rate
  const [showHistory, setShowHistory] = useState(false);
  const [conversionHistory, setConversionHistory] = useState([]);

  const handleSwap = () => {
    setFromCountry(toCountry);
    setToCountry(fromCountry);
  };

  const handleShowHistory = () => {
    const history = JSON.parse(localStorage.getItem("conversions")) || [];
    setConversionHistory(history);
    setShowHistory(true);
  };

  const convertCurrency = async () => {
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/a414c1ce878f5abd05a24b4e/pair/${fromCountry}/${toCountry}/${amount}`
    );

    const data = await response.json();
    setConvertedAmount(data.conversion_result);
    setExchangeRate(data.conversion_rate);
    triggerConfetti();

    // Store conversion history
    const newConversion = {
      fromCountry,
      toCountry,
      amount,
      convertedAmount: data.conversion_result,
      exchangeRate: data.conversion_rate,
    };

    const existingConversions =
      JSON.parse(localStorage.getItem("conversions")) || [];
    existingConversions.push(newConversion);
    localStorage.setItem("conversions", JSON.stringify(existingConversions));
  };

  const triggerConfetti = () => {
    confetti({
      angle: 60,
      spread: 55,
      particleCount: 100,
      origin: { x: 0 },
    });
    confetti({
      angle: 120,
      spread: 55,
      particleCount: 100,
      origin: { x: 1 },
    });
  };

  return (
    <div>
      <h1>Currency Converter</h1>

      <input
        type="text"
        value={fromCountry}
        onChange={(e) => setFromCountry(e.target.value)}
        placeholder="From Country"
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />
      <button onClick={handleSwap}>🔀</button>
      <input
        type="text"
        value={toCountry}
        onChange={(e) => setToCountry(e.target.value)}
        placeholder="To Country (e.g., USD)"
      />
      <input
        type="text"
        value={convertedAmount}
        placeholder="Converted Amount"
        readOnly
      />
      <div className="button-container">
        <button onClick={convertCurrency}>Convert</button>
      </div>

      <div className="center-content">
        {(convertedAmount || exchangeRate) && (
          <table>
            <tbody>
              {exchangeRate && (
                <tr>
                  <td>Exchange Rate:</td>
                  <td>{exchangeRate}</td>
                </tr>
              )}
              {convertedAmount && (
                <tr>
                  <td>Converted Amount:</td>
                  <td>{convertedAmount}</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
      {/* <button onClick={handleShowHistory}>Previous History</button> */}

      {showHistory && (
        <div className="popup">
          <button onClick={() => setShowHistory(false)}>Close</button>
          <ul>
            {conversionHistory.map((item, index) => (
              <li key={index}>
                {item.fromCountry} to {item.toCountry}: {item.amount} -> {item.convertedAmount} at rate {item.exchangeRate}
              </li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
};

export default IndexPage;
