import { style } from "@vanilla-extract/css";
export const task = style({
  cursor: "pointer",
  backgroundColor: "white",
  marginBottom: 10,
  padding: 10,
  paddingTop: 25,
  borderRadius: 10,
  outline: "none",
  border: "none",
  display: "block",
  width: "100%",
  height: "auto",
  fontSize: 14,
  position: "relative",
});

export const draggingTask = style({
  zIndex: 999,
  border: "1px solid rgb(0, 85, 255)",
});

export const trash = style({
  position: "absolute",
  top: 5,
  right: 5,
  height: 20,
  width: 20,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50%",
  selectors: {
    "&:hover": {
      backgroundColor: "rgb(171, 206, 206)",
      borderRadius: "50%",
    },
  },
});
