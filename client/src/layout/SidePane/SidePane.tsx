import styles from "./SidePane.module.css";
const logs = [
  {
    id: "1",
    value: "hbjuhi",
  },
  {
    id: "2",
    value: "hbjuhi hujuh u hjhn hbju  uhuh u huhu huhiuhuhu u",
  },
  {
    id: "3",
    value: "hbjuhi hujuh u hjhn hbju  uhuh u huhu huhiuhuhu u",
  },
];
interface SidePaneProps {
  toggleSidePane: React.Dispatch<React.SetStateAction<boolean>>;
}
export const SidePane = ({ toggleSidePane }: SidePaneProps) => {
  return (
    <div className={styles.sidePane}>
      <div className={styles.cross} onClick={() => toggleSidePane(false)}>
        <span>X</span>
      </div>
      {logs.map((log) => (
        <p key={log.id} className={styles.log}>
          {log.value}
        </p>
      ))}
    </div>
  );
};
