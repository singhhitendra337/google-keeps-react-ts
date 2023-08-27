import { ReactNode } from "react";
import "./styles/Header.css";

interface headerprops {
  setHide: React.Dispatch<React.SetStateAction<boolean>>;
  children?: ReactNode;
}

const Header = ({ setHide }: headerprops) => {
  return (
    <header>
      <div className="header-container">
        <div className="left-header">
          <div
            className="material-symbols-outlined"
            onClick={() => setHide((prevHide) => !prevHide)}
            style={{ cursor: "pointer", color: "#7d7d7d " }}
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
            <div
              className="material-symbols-outlined"
              style={{ marginLeft: 15, color: "#7d7d7d " }}
            >
              search
            </div>
            <input type="text" className="search" placeholder="Search" />
          </div>
          <div className="mid-header-icons">
            <div
              className="material-symbols-outlined"
              style={{ marginLeft: 5, color: "#7d7d7d " }}
            >
              refresh
            </div>

            <div
              className="material-symbols-outlined"
              style={{ marginLeft: 5, color: "#7d7d7d " }}
            >
              view_list
            </div>

            <div
              className="material-symbols-outlined"
              style={{ marginLeft: 5, color: "#7d7d7d " }}
            >
              settings
            </div>
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

export default Header;
