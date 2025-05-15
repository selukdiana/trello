import { useSearchParams } from "react-router";
import styles from "./BoardPage.module.css";
import { useAppSelector } from "../../store/hooks";
import { List } from "../../components/List";

export const BoardPage = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  //dispatch(lists by id)
  const listsArr = useAppSelector((state) => state.lists.data);
  return (
    <div className={styles.board}>
      <div className="container">
        <div className={styles.content}>
          {listsArr.map((list) => (
            <List list={list} key={list.id} />
          ))}
        </div>
      </div>
    </div>
  );
};
