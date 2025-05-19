import { globalStyle, style } from "@vanilla-extract/css";

export const home = style({
  padding: "50px 0",
});
export const content = style({
  display: "grid",
  gridTemplateRows: "auto",
  gridTemplateColumns: "repeat(5, 1fr)",
  gap: 20,
});

export const title = style({
  display: " flex",
  gap: 20,
  alignItems: "center",
  marginBottom: 20,
});

globalStyle(`${title} h2`, {
  color: "white",
});

globalStyle(`${title} p`, {
  cursor: "pointer",
  color: "rgb(164, 181, 180)",
});

export const board = style({
  width: "100%",
  height: 150,
  borderRadius: 10,
  backgroundColor: "#f1f2f4",
  padding: 10,
  cursor: "pointer",
  selectors: {
    "&:hover": {
      transform: "translateY(-3%)",
    },
  },
});

export const boardHeader = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

globalStyle(`${boardHeader} svg`, {
  height: 15,
  marginLeft: 10,
});

globalStyle(`${boardHeader} svg:hover`, {
  fill: "rgb(85, 88, 88)",
});

export const addBoard = style({
  backgroundColor: "transparent",
  border: "1px dotted whitesmoke",
});
