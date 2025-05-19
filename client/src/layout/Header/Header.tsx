import { Link } from "react-router";
import { SidePane } from "../SidePane";
import { useState } from "react";
import { burger, content, header } from "./Header.css";

export const Header = () => {
  const [isSidePaneOpened, setIsSidePaneOpened] = useState(false);
  return (
    <header className={header}>
      <div className="container">
        <div className={content}>
          <Link to="/">
            <h1>Trello</h1>
          </Link>
          {isSidePaneOpened ? (
            <SidePane toggleSidePane={setIsSidePaneOpened} />
          ) : null}
          <div
            className={burger}
            onClick={() => {
              setIsSidePaneOpened(true);
            }}
          >
            <span></span>
          </div>
        </div>
      </div>
    </header>
  );
};
