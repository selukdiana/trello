import styles from "./Header.module.css";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.content}>
          <h1>Trello</h1>
          <div className={styles.burger}>
            <span></span>
          </div>
        </div>
      </div>
    </header>
  );
};
