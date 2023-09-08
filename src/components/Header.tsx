import { DataContextInterface } from "../interfaces/interfaces";
import DataContext from "../store/data-context";
import "./styles/Header.css";
import React, { useContext } from "react";

interface HeaderProps {
  toggleHide: () => void;
  searchStringChangeHandler: (pattern: string) => void;
}

const Header = ({ toggleHide, searchStringChangeHandler }: HeaderProps) => {
  const { darkMode, toggleDarkMode } = useContext(
    DataContext
  ) as DataContextInterface;
  console.log("header rerendered");
  return (
    <header
      style={{
        backgroundColor: darkMode ? "#202124" : "",
        borderColor: darkMode ? "#5f6368" : "",
      }}
    >
      <div className="header-container">
        <div className="left-header">
          <button
            className="material-symbols-outlined hamburger"
            onClick={toggleHide}
            style={{ color: darkMode ? "white" : "" }}
          >
            {" "}
            menu{" "}
          </button>

          <div className="keep-div">
            <img
              src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"
              alt=""
              className="keeps-img"
            />
            <div
              className="keeps-text"
              style={{ color: darkMode ? "white" : "" }}
            >
              Keep
            </div>
          </div>
        </div>
        <div className="mid-header">
          <div
            className="search-div"
            style={{ backgroundColor: darkMode ? "rgba(241,243,244,.24)" : "" }}
          >
            <button
              className="material-symbols-outlined search-icon"
              style={{
                marginLeft: 15,
                backgroundColor: darkMode ? "transparent" : "",
                color: darkMode ? "white" : "",
              }}
            >
              search
            </button>
            <input
              type="text"
              className={`search ${darkMode ? "dark-placeholder" : ""}`}
              placeholder="Search"
              onChange={(event) =>
                searchStringChangeHandler(event.target.value)
              }
              style={{ backgroundColor: darkMode ? "transparent" : "" }}
            />
          </div>
          <div className="mid-header-icons">
            {darkMode ? (
              <>
                <button className="material-symbols-outlined mid-icons">
                  refresh
                </button>

                <button className="material-symbols-outlined mid-icons">
                  view_list
                </button>

                <button className="material-symbols-outlined mid-icons">
                  settings
                </button>
              </>
            ) : (
              <>
                <button className="refresh"></button>
                <button className="grid"></button>
                <button className="settings"></button>
              </>
            )}
          </div>
        </div>
        <div className="right-header">
          <button
            className="material-symbols-outlined dark-mode"
            onClick={toggleDarkMode}
          >
            dark_mode
          </button>
          <button className="material-symbols-outlined apps">apps</button>
          <button className="material-symbols-outlined account">
            account_circle
          </button>
        </div>
      </div>
    </header>
  );
};

export default React.memo(Header);
