import React, { useState } from "react";
import { render } from "react-dom";
import "./tab.css";

const Tab = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const handleClick = (index) => setActiveIndex(index);
  const checkActive = (index, className) => activeIndex === index ? className : "";
  return (
    <React.Fragment>
      <div className="tabs">
        <button
          className={`tab ${checkActive(1, "active")}`}
          onClick={() => handleClick(1)}
        >
          Planner
        </button>
        <button
          className={`tab ${checkActive(2, "active")}`}
          onClick={() => handleClick(2)}
        >
          Compare
        </button>
        <button
          className={`tab ${checkActive(3, "active")}`}
          onClick={() => handleClick(3)}
        >
          Summary
        </button>
        <button
          className={`tab ${checkActive(4, "active")}`}
          onClick={() => handleClick(4)}
        >
          Profile
        </button>
      </div>
      <div className="panels">
        <div className={`panel ${checkActive(1, "active")}`}>
          <p>Your budget plan</p>
        </div>
        <div className={`panel ${checkActive(2, "active")}`}>
          <p>Product prices</p>
        </div>
        <div className={`panel ${checkActive(3, "active")}`}>
          <p>Your summary</p>
        </div>
        <div className={`panel ${checkActive(4, "active")}`}>
          <p>Sign in</p>
        </div>
      </div>
    </React.Fragment>
  )
};

export default Tab
