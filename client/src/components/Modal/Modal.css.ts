import { globalStyle, style } from "@vanilla-extract/css";
export const modal = style({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: " 100%",
  backgroundColor: "rgba(0, 0, 0, 0.75)",
  overflow: "hidden",
  overflowY: "auto",
  transition: "opacity 0.3s",
  zIndex: 999,
});
export const wrapper = style({
  position: "absolute",
  top: 0,
  left: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  minHeight: "100%",
});

export const content = style({
  position: "relative",
  padding: 20,
  width: "100%",
  maxWidth: 400,
  borderRadius: 5,
  backgroundColor: "white",
  transform: "translateY(-50%)",
  transition: "opacity 0.3s, transform 0.3s",
});

const headerStyles = {
  color: "rgb(53, 50, 50)",
  fontSize: 20,
  cursor: "pointer",
};
export const header = style({
  display: "flex",
  justifyContent: "space-between",
  marginBottom: 20,
});

globalStyle(`${header} h3, ${header} span`, headerStyles);

export const body = style({
  color: "rgb(53, 50, 50)",
});
