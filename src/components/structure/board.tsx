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

export interface boardInfo {
  id: string;
  title: string;
  creator: string;
  allowed_users: Array<allowedUsers>;
  notes: Array<noteInfo>;
}

export default function Board() {
  const params = useParams();
  const [currentBoard, setCurrentBoard] = useState<boardInfo>({
    id: "",
    title: "",
    creator: "",
    allowed_users: [],
    notes: [],
  });

  const handleNotes = (newNotes: Array<noteInfo>) => {
    console.log("chavalos");
    // Create a new object with the updated data
    const updatedBoard = {
      ...currentBoard, // Spread existing properties
      notes: newNotes, // Update the notes property
    };
    setCurrentBoard(updatedBoard);
  };

  useEffect(() => {
    async function fetchBoardData() {
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_URL + `board/${params.boardid}`
        );
        const newBoard: boardInfo = {
          id: response.data.id,
          title: response.data.title,
          creator: response.data.creator,
          allowed_users: response.data.allowed_users,
          notes: response.data.note_board,
        };
        setCurrentBoard(newBoard);
      } catch (error) {
        console.error("Error fetching board:", error);
        // Handle errors appropriately
      }
    }

    fetchBoardData(); // Trigger the fetch on first render
  }, [params]);

  return (
    <Box>
      {params?.boardid ? (
        <Grid container spacing={2}>
          {currentBoard.notes.map((note: noteInfo) => {
            return (
              <Grid item key={note.title}>
                <BasicCard
                  content={note}
                  handler={handleNotes}
                  board={currentBoard}
                />
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
