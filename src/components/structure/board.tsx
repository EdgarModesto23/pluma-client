import { Typography } from "@mui/material";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface allowedUsers {
  email: string;
}

interface noteInfo {
  id: string;
  title: string;
  body: string;
  color: string;
  creator: string;
}

interface boardInfo {
  id: string;
  creator: string;
  allowed_users: Array<allowedUsers>;
  notes: Array<noteInfo>;
}

export default function Board() {
  const [currentBoard, setCurrentBoard] = useState<boardInfo>({
    id: "",
    creator: "",
    allowed_users: [],
    notes: [],
  });

  const params = useParams();
  const base_url = import.meta.env.VITE_API_URL;
  const url = base_url + `board/${params.boardid}`;
  const getBoard = useCallback(async () => {
    await axios.get(url).then((response) => {
      setCurrentBoard({
        id: response.data.id,
        creator: response.data.creator,
        allowed_users: response.data.allowed_users,
        notes: response.data.note_board,
      });
    });
  }, [url]);

  useEffect(() => {
    getBoard();
  }, [url, getBoard]);
  return <Typography>{currentBoard.id}</Typography>;
}
