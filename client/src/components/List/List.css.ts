import { style } from "@vanilla-extract/css";
export const list = style({
  backgroundColor: "#f1f2f4",
  minWidth: 300,
  maxWidth: 300,
  borderRadius: 10,
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: 5,
  paddingRight: 5,
  // padding: 10px 5px;
  position: "relative",
});

export const title = style({
  marginBottom: 10,
  padding: 5,
});

export const addTask = style({
  cursor: "pointer",
  color: "#44546f",
  fontSize: 12,
  paddingLeft: 5,
  marginBottom: 30,
});

export const deleteList = style({
  cursor: "pointer",
  position: "absolute",
  top: 10,
  right: 10,
  width: 20,
  height: 20,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50%", //50%
  selectors: {
    "&:hover": {
      backgroundColor: "#44546f",
    },
  },
});

export const dropArea = style({
  height: 50,
  border: "1px dashed grey",
  borderRadius: 10,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 10,
});
