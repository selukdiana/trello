import classNames from "classnames";
import styles from "./HomePage.module.css";

const boardsArr = [
  {
    id: "1",
    name: "Board 1",
  },
  {
    id: "2",
    name: "Board 2",
  },
  {
    id: "3",
    name: "Board 3",
  },
  {
    id: "4",
    name: "Board 4",
  },
];

export const HomePage = () => {
  return (
    <section className={styles.home}>
      <div className="container">
        <div className={styles.content}>
          {boardsArr.map((board) => {
            return (
              <div className={styles.board}>
                <h3>{board.name}</h3>
              </div>
            );
          })}
          <div className={classNames(styles.board, styles.addBoard)}>
            <h3>Add Board +</h3>
          </div>
        </div>
      </div>
    </section>
  );
};
