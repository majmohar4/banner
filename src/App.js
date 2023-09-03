import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [showBanner, setShowBanner] = useState(false);
  const [bannerMessage, setBannerMessage] = useState("");
  const [additionalClassName, setAdditionalClassName] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/api/request`)
      .then((response) => response.json())
      .then((result) => {
        if (result.sporočilo) {
          setBannerMessage(result.sporočilo);
          setShowBanner(true);
          setTimeout(() => {
            closeBanner();
          }, 5000);
        } else {
          setShowBanner(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const closeBanner = () => {
    setAdditionalClassName("closing");

    setTimeout(() => {
      setShowBanner(false);
    }, 2000);
  };

  return (
    <div className="app">
      {showBanner && (
        <div className={`banner ${additionalClassName} app`}>
          <span className="text">{bannerMessage}</span>
          <button className="close-button" onClick={closeBanner}>
            X
          </button>
        </div>
      )}
      <h1>React aplikacija</h1>
    </div>
  );
}

export default App;
