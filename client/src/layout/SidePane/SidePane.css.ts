import { globalStyle, style } from "@vanilla-extract/css";
export const sidePane = style({
  position: "absolute",
  top: 0,
  right: 0,
  width: 300,
  height: " 100vh",
  overflowY: "auto",
  backgroundColor: "rgb(243, 237, 237)",
  zIndex: 1000,
  paddingLeft: 10,
});

export const log = style({
  color: "rgb(37, 35, 35)",
  borderBottom: "1px solid gray",
  padding: 4,
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
