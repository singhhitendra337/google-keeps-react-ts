import "./styles/Header.css";
import React, { useState } from "react";

const Header = ({
  toggleHide,
  searchStringChangeHandler,
}: {
  toggleHide: () => void;
  searchStringChangeHandler: (pattern: string) => void;
}) => {
  console.log("header rerendered");
  return (
    <header>
      <div className="header-container">
        <div className="left-header">
          <div
            className="material-symbols-outlined hamburger"
            onClick={toggleHide}
          >
            {" "}
            menu{" "}
          </div>

          <div className="keep-div">
            <img
              src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"
              alt=""
              className="keeps-img"
            />
            <div className="keeps-text">Keep</div>
          </div>
        </div>
        <div className="mid-header">
          <div className="search-div">
            <button
              className="material-symbols-outlined search-icon"
              style={{ marginLeft: 15 }}
            >
              search
            </button>
            <input
              type="text"
              className="search"
              placeholder="Search"
              onChange={(event) =>
                searchStringChangeHandler(event.target.value)
              }
            />
          </div>
          <div className="mid-header-icons">
            {/* <button className="material-symbols-outlined mid-icons">
              refresh
            </button>

            <button className="material-symbols-outlined mid-icons">
              view_list
            </button>

            <button className="material-symbols-outlined mid-icons">
              settings
            </button> */}

            <button className="refresh"></button>
            <button className="grid"></button>
            <button className="settings"></button>
          </div>
        </div>
        <div className="right-header">
          <div
            className="material-symbols-outlined"
            style={{ color: "#7d7d7d " }}
          >
            apps
          </div>
          <div
            className="material-symbols-outlined"
            style={{ marginLeft: 10, color: "#7d7d7d " }}
          >
            account_circle
          </div>
        </div>
      </div>
    </header>
  );
};

export default React.memo(Header);
