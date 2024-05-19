import React, { useState } from "react";
import axios from "axios";
import "./App.css"

function App() {
  const [domain, setDomain] = useState('google.com');
  const [ip, setIp] = useState('217.196.161.123');
  const [domainData, setDomainData] = useState(null);
  const [ipData, setIpData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDomainData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`https://domain-checker7.p.rapidapi.com/whois?domain=${domain}`, {
        headers: {
          'X-RapidAPI-Key': '0a901a0565msh04fdbe1940dcf12p1bf25ajsn3eb95bcf8d21',
          'X-RapidAPI-Host': 'domain-checker7.p.rapidapi.com'
        }
      });
      setDomainData(response.data);
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  };

  const fetchIpData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`http://ip-api.com/json/${ip}`);
      setIpData(response.data);
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  };

  const handleDomainSubmit = async (event) => {
    event.preventDefault();
    if (domain.trim() !== '') {
      await fetchDomainData();
    }
  };

  const handleIpSubmit = async (event) => {
    event.preventDefault();
    if (ip.trim() !== '') {
      await fetchIpData();
    }
  };

  const handleDomainInputChange = (event) => {
    setDomain(event.target.value);
  };

  const handleIpInputChange = (event) => {
    setIp(event.target.value);
  };

  const renderDomainData = () => {
    return (
        <div className={"domainList"}>
          {Object.entries(domainData).map(([key, value]) => (
              <p key={key}>
                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
              </p>
          ))}
        </div>
    );
  };

  const renderIpData = () => {
    return (
        <div className={"ipList"}>
          {Object.entries(ipData).map(([key, value]) => (

              <p key={key}>
                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
              </p>
          ))}
        </div>
    );
  };

  return (
      <div className="container">
        <div className="section">
          <h2>Domain Checker</h2>
          <form onSubmit={handleDomainSubmit}>
            <input type="text" value={domain} onChange={handleDomainInputChange} placeholder="Enter domain" />
            <button type="submit">Search</button>
          </form>
          {isLoading ? (
              <p>Loading domain data...</p>
          ) : error ? (
              <p>Error: {error}</p>
          ) : domainData ? renderDomainData() : null}
        </div>
        <div className="section">
          <h2>IP Location Checker</h2>
          <form onSubmit={handleIpSubmit}>
            <input type="text" value={ip} onChange={handleIpInputChange} placeholder="Enter IP address" />
            <button type="submit">Search</button>
          </form>
          {isLoading ? (
              <p>Loading IP location data...</p>
          ) : error ? (
              <p>Error: {error}</p>
          ) : ipData ? renderIpData() : null}
        </div>
      </div>
  );
}

export default App;
