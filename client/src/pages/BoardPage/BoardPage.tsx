import { useSearchParams } from "react-router";
import styles from "./BoardPage.module.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { List } from "../../components/List";
import { useState } from "react";
import { addList } from "../../store/slices/listsSlice";

export const BoardPage = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [isAddList, setIsAddList] = useState(false);
  //dispatch(lists by id)
  const listsArr = useAppSelector((state) => state.lists.data);
  return (
    <div className={styles.board}>
      <div className={styles.content}>
        {listsArr.map((list) => (
          <List list={list} key={list.id} />
        ))}
        {isAddList ? (
          <input
            className={styles.addListInput}
            onBlur={(e) => {
              dispatch(addList(e.target.value));
              setIsAddList(false);
            }}
            autoFocus={true}
          />
        ) : (
          <div
            className={styles.addList}
            onClick={(e) => {
              e.stopPropagation();
              setIsAddList(true);
            }}
          >
            <p>+ Add list</p>
          </div>
        )}
      </div>
    </div>
  );
};
