import { Link } from "react-router";
import styles from "./Header.module.css";
import { SidePane } from "../SidePane";
import { useState } from "react";

export const Header = () => {
  const [isSidePaneOpened, setIsSidePaneOpened] = useState(false);
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.content}>
          <Link to="/">
            <h1>Trello</h1>
          </Link>
          {isSidePaneOpened ? (
            <SidePane toggleSidePane={setIsSidePaneOpened} />
          ) : null}
          <div
            className={styles.burger}
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
