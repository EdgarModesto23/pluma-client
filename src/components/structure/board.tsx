import { Box, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useBoardContext } from "./board-context";
import BasicCard from "./note";
import BasicSpeedDial from "./dial";

interface allowedUsers {
  email: string;
}

export interface noteInfo {
  id: string;
  title: string;
  body: string;
  color: string;
  creator: string;
}

interface boardInfo {
  id: string;
  title: string;
  creator: string;
  allowed_users: Array<allowedUsers>;
  notes: Array<noteInfo>;
}

export default function Board() {
  const [currentBoard, setCurrentBoard] = useState<boardInfo>({
    id: "",
    title: "",
    creator: "",
    allowed_users: [],
    notes: [],
  });

  const params = useParams();
  const boardContext = useBoardContext();
  const handleCurrentBoard = useCallback(
    (newBoard: boardInfo) => {
      setCurrentBoard(newBoard);
      boardContext?.setNotes(newBoard.notes);
      boardContext?.setTitle(newBoard.title);
    },
    [boardContext]
  );

  const [hasFetched, setHasFetched] = useState(false);
  useEffect(() => {
    async function getBoard() {
      await axios
        .get(import.meta.env.VITE_API_URL + `board/${params.boardid}`)
        .then((response) => {
          const newBoard: boardInfo = {
            id: response.data.id,
            title: response.data.title,
            creator: response.data.creator,
            allowed_users: response.data.allowed_users,
            notes: response.data.note_board,
          };
          handleCurrentBoard(newBoard);
        });
    }
    if (!hasFetched) {
      getBoard();
      setHasFetched(false);
    }
  }, [handleCurrentBoard, params, hasFetched]);

  return (
    <Box>
      {params?.boardid ? (
        <Grid container spacing={2}>
          {currentBoard.notes.map((note: noteInfo) => {
            return (
              <Grid item key={note.title}>
                <BasicCard content={note} />
              </Grid>
            );
          })}
          <BasicSpeedDial />
        </Grid>
      ) : (
        <Typography variant="h3">Welcome to Pluma!</Typography>
      )}
    </Box>
  );
}
