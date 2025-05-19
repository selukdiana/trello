import { globalStyle, style } from "@vanilla-extract/css";

export const header = style({
  padding: "20px 0",
  height: 80,
});

export const content = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const burger = style({
  cursor: "pointer",
  width: 20,
  height: 14,
  position: "relative",
  selectors: {
    "&::before": { top: 0, left: 0 },
    "&::after": {
      bottom: 0,
      left: 0,
    },
  },
});

globalStyle(`${burger}::before, ${burger}::after`, {
  content: "",
  height: 2,
  width: "100%",
  backgroundColor: "white",
  position: "absolute",
});

globalStyle(`${burger} span`, {
  position: "absolute",
  top: "50%",
  left: 0,
  transform: "translateY(-50%)",
  height: 2,
  width: "100%",
  backgroundColor: "white",
});

globalStyle("h1", {
  color: "white",
});
