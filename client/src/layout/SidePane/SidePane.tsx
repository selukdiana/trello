import { useEffect } from "react";
import { cross, sidePane, log as logStyles } from "./SidePane.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchLogs } from "../../store/slices/logsSlice";
interface SidePaneProps {
  toggleSidePane: React.Dispatch<React.SetStateAction<boolean>>;
}
export const SidePane = ({ toggleSidePane }: SidePaneProps) => {
  const dispatch = useAppDispatch();
  const logs = useAppSelector((state) => state.logs.data);
  const appState = useAppSelector((state) => state);
  useEffect(() => {
    dispatch(fetchLogs());
  }, [appState]);

  return (
    <div className={sidePane}>
      <div className={cross} onClick={() => toggleSidePane(false)}>
        <span>X</span>
      </div>
      {logs.map((log) => (
        <p key={log.id} className={logStyles}>
          {log.value}
        </p>
      ))}
    </div>
  );
};
