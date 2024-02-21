import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import { useNavigate } from "react-router-dom";

interface BoardInfo {
  id: string;
  title: string;
  creator: number;
  allowed_users: Array<string>;
}

export default function MyBoards({ totalBoards }) {
  const navigate = useNavigate();
  const [openBoardMenu, setBoardMenu] = useState(false);

  const handleBoardMenu = () => {
    console.log(totalBoards);
    setBoardMenu(!openBoardMenu);
  };

  return (
    <List>
      <ListItemButton onClick={handleBoardMenu} sx={{ px: 2.5 }}>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="My boards" />
        {openBoardMenu ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openBoardMenu} timeout="auto" unmountOnExit>
        <List>
          {totalBoards.boards.map((board: BoardInfo) => (
            <ListItem
              key={board.title}
              disablePadding
              sx={{ display: "block" }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: openBoardMenu ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={() => {
                  navigate(`${board.id}`);
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: openBoardMenu ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <AssignmentOutlinedIcon />
                </ListItemIcon>
                <ListItemText
                  primary={board.title}
                  sx={{ opacity: openBoardMenu ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Collapse>
    </List>
  );
}
