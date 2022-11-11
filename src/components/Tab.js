import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import JwtService from "../service/JwtService";
import "./tab.css";

const Tab = () => {
  const context = useContext(UserContext)
  const [activeIndex, setActiveIndex] = useState(1);
  const navigate = useNavigate();
  const handleClick = (route) => navigate(`/${route}`);
  const checkActive = (index, className) => activeIndex === index ? className : "";
  const logout = () => {
    context.processLogout()
    navigate('/users')
  }
  const loggedIn = () => {
    return (
      <div className="tab-tab">
          <button
            className={`tab ${checkActive(4, "active")}`}
            onClick={()=> logout()}
          >
            Logout
          </button>
      </div>
      
    )
  }
  const loggedOut = () => {
    return (
      <div className="tab-tab">
          <button
            className={`tab ${checkActive(4, "active")}`}
            onClick={()=>handleClick('users')}
          >
            Login
          </button>
        </div>
    )
  }
  return (
    <React.Fragment>
      <div className="tabs">
        <div className="tab-tab">
            <button
              className={`tab ${checkActive(1, "active")}`}
                onClick={()=>handleClick('')}
            >
            <label for="tab-1">Planner</label>
            </button>
        </div>
        <div className="tab-tab">
          <button
            className={`tab ${checkActive(2, "active")}`}
            onClick={()=>handleClick('product')}
          >
            <label for="tab-2">Compare</label>
          </button>
        </div>
        <div className="tab-tab">
          <button
            className={`tab ${checkActive(3, "active")}`}
            onClick={()=>handleClick('summary')}
          >
            <label for="tab-3">Summary</label>
          </button>
        </div>
        {JwtService.hasAuthToken() ? loggedIn() : loggedOut()}
      </div>
    </React.Fragment>
  )
};

export default Tab
