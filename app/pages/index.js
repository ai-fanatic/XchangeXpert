
import React, { useState } from 'react';

const IndexPage = () => {
  const [currency, setCurrency] = useState('');
  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState(null);

  const handleCurrencyChange = (e) => setCurrency(e.target.value);
  const handleAmountChange = (e) => setAmount(e.target.value);

  const convertCurrency = async () => {
    // Fetch conversion rate from an API (e.g., ExchangeRate-API)
    // Replace <API_KEY> with your actual API key
    const response = await fetch(\`https://v6.exchangerate-api.com/v6/<API_KEY>/pair/\${currency}/USD/\${amount}\`);
    const data = await response.json();
    setConvertedAmount(data.conversion_result);
  };

  return (
    <div>
      <h1>Currency Converter</h1>
      <input type="text" value={currency} onChange={handleCurrencyChange} placeholder="Currency (e.g., EUR)" />
      <input type="number" value={amount} onChange={handleAmountChange} placeholder="Amount" />
      <button onClick={convertCurrency}>Convert</button>
      {convertedAmount && <p>Converted Amount in USD: {convertedAmount}</p>}
    </div>
  );
};

export default IndexPage;
