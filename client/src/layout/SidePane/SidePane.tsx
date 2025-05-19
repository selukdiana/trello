import { cross, sidePane, log as logStyles } from "./SidePane.css";

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
