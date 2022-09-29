import React, { useState } from "react";
import "./tab.css";

const Tab = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const handleClick = (index) => setActiveIndex(index);
  const checkActive = (index, className) => activeIndex === index ? className : "";
  return (
    <React.Fragment>
      <div className="tabs">
        <div className="tab-tab">
            <button
              className={`tab ${checkActive(1, "active")}`}
                onClick={() => handleClick(1)}
            >
            <label for="tab-1">Planner</label>
            </button>
        </div>
        <div className="tab-tab">
          <button
            className={`tab ${checkActive(2, "active")}`}
            onClick={() => handleClick(2)}
          >
            <label for="tab-2">Compare</label>
          </button>
        </div>
        <div className="tab-tab">
          <button
            className={`tab ${checkActive(3, "active")}`}
            onClick={() => handleClick(3)}
          >
            <label for="tab-3">Summary</label>
          </button>
        </div>
        <div className="tab-tab">
          <button
            className={`tab ${checkActive(4, "active")}`}
            onClick={() => handleClick(4)}
          >
            Profile
          </button>
        </div>
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
