import { globalStyle, style } from "@vanilla-extract/css";
export const content = style({
  height: "calc(100vh - 80px)",
  overflow: "hidden",
  overflowX: "auto",
  display: "flex",
  gap: 20,
  alignItems: "flex-start",
  padding: 15,
});
export const addList = style({
  border: "1px dotted white",
  minWidth: 300,
  padding: "10px 5px",
  borderRadius: 10,
  cursor: "pointer",
  selectors: {
    "&:hover": {
      backgroundColor: "currentColor",
      border: "1px solid black",
      transform: "translateY(-5%)",
    },
  },
});

globalStyle(`${addList} p`, {
  color: "white",
  fontSize: 12,
});

export const addListInput = style({
  width: 300,
  outline: "none",
  border: "none",
  padding: "10px 5px",
  borderRadius: 10,
  backgroundColor: "#44546f",
  color: "white",
});
