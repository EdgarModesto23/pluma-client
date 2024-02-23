import { useContext } from "react";
import { BoardTitleContext } from "./board-context";

export function useBoardContext() {
  return useContext(BoardTitleContext);
}
