"use client";
import React, { useState } from "react";

import "./styles/globals.css";
import confetti from "canvas-confetti";

const IndexPage = () => {
  const [fromCountry, setFromCountry] = useState("");
  const [toCountry, setToCountry] = useState("USD"); // Defaulting to USD
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState("");

  const handleSwap = () => {
    setFromCountry(toCountry);
    setToCountry(fromCountry);
  };

  const convertCurrency = async () => {
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/a414c1ce878f5abd05a24b4e/pair/${fromCountry}/${toCountry}/${amount}`
    );

    const data = await response.json();
    setConvertedAmount(data.conversion_result);
    triggerConfetti();
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
        {convertedAmount && <p>Exchange Rate: {convertedAmount}</p>}
      </div>
    </div>
  );
};

export default IndexPage;
