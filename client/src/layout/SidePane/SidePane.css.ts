import { globalStyle, style } from "@vanilla-extract/css";
export const sidePane = style({
  position: "absolute",
  top: 0,
  right: 0,
  width: 300,
  height: " 100vh",
  overflowY: "auto",
  backgroundColor: "white",
  zIndex: 1000,
  paddingLeft: 10,
});

export const log = style({
  color: "rgb(37, 35, 35)",
  marginBottom: 8,
  fontSize: 12,
  borderBottom: "1px dotted black",
});

export const cross = style({
  cursor: "pointer",
  height: 80,
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: "0 15px",
});

globalStyle(`${cross} span`, {
  color: "rgb(37, 35, 35)",
  fontSize: 20,
});
