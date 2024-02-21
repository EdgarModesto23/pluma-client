import * as React from "react";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useParams } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  Snackbar,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import { noteInfo, useBoardContext } from "./board-context";
import { CirclePicker } from "react-color";
import ReactQuill from "react-quill";
import { GitHub } from "@mui/icons-material";

export default function BasicSpeedDial() {
  const [showNote, setShowNote] = React.useState(false);
  const [showEdit, setShowEdit] = React.useState(false);
  const [showInv, setShowInv] = React.useState(false);
  const [color, setColor] = React.useState("");
  const [snack, setSnack] = React.useState({ state: false, message: "" });
  const [text, setText] = React.useState("");
  const handleChangeColor = (color: string) => {
    setColor(color);
  };

  const handleClick = (handler: (value: boolean) => void) => {
    handler(true);
  };

  const handleClose = (handler: (value: boolean) => void) => {
    handler(false);
  };

  const boardContext = useBoardContext();
  const params = useParams();

  return (
    <Box sx={{ height: 320, transform: "translateZ(0px)", flexGrow: 1 }}>
      <Fab
        onClick={() => {
          handleClick(setShowNote);
        }}
        color="primary"
        aria-label="add"
        size="large"
        sx={{ position: "absolute", bottom: -500, right: 20 }}
      >
        <Tooltip title="Add new note">
          <AddIcon />
        </Tooltip>
      </Fab>
      <Fab
        onClick={() => {
          handleClick(setShowEdit);
        }}
        color="success"
        aria-label="Edit board"
        size="large"
        sx={{ position: "absolute", bottom: -400, right: 20 }}
      >
        <Tooltip title="Edit board">
          <EditIcon />
        </Tooltip>
      </Fab>
      <Fab
        onClick={() => {
          handleClick(setShowInv);
        }}
        color="warning"
        aria-label="Edit board"
        size="large"
        sx={{ position: "absolute", bottom: -300, right: 20 }}
      >
        <Tooltip title="Invite people">
          <PersonAddAltIcon />
        </Tooltip>
      </Fab>
      <Fab
        onClick={() => {
          handleClick(setShowInv);
        }}
        href="https://github.com/EdgarModesto23/pluma-client"
        color="secondary"
        aria-label="Edit board"
        size="large"
        sx={{ position: "absolute", bottom: -200, right: 20 }}
      >
        <Tooltip title="Github repo">
          <GitHubIcon />
        </Tooltip>
      </Fab>

      <Dialog
        open={showNote}
        onClose={() => {
          handleClose(setShowNote);
        }}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            const base_url = import.meta.env.VITE_API_URL + "note/";
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            formJson.body = text;
            formJson.color = color;
            formJson.board = params?.boardid ? params.boardid : "";
            axios.post(base_url, formJson).then((response) => {
              boardContext?.notes
                ? () => {
                    const newNote: noteInfo = response.data;
                    const currentNotes = boardContext?.notes;
                    currentNotes?.push(newNote);
                    boardContext?.setNotes(currentNotes);
                  }
                : null;
              setSnack({
                state: true,
                message: "You added a note succesfully!",
              });
            });
          },
        }}
      >
        <DialogTitle sx={{ backgroundColor: color }}>Add note</DialogTitle>
        <DialogContent sx={{ backgroundColor: color }}>
          <TextField
            autoFocus
            required
            margin="dense"
            id="title"
            name="title"
            label="Title"
            fullWidth
            variant="standard"
          />
          <Typography paddingY={2}>Content</Typography>
          <ReactQuill theme="snow" value={text} onChange={setText} />
          <Box paddingY={2}>
            <Typography paddingY={1}>Choose color</Typography>
            <CirclePicker
              onChange={(newColor) => {
                handleChangeColor(newColor.hex);
              }}
              colors={["#419D78", "#4C5454", "#FF715B", "#F7D08A", "#523F38"]}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: color }}>
          <Button
            color="secondary"
            onClick={() => {
              handleClose(setShowNote);
            }}
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={showEdit}
        onClose={() => {
          handleClose(setShowEdit);
        }}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const url =
              import.meta.env.VITE_API_URL + `board/${params.boardid}/`;
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            axios.patch(url, formJson).then((response) => {
              boardContext?.setTitle(response.data.title);
              setSnack({
                state: true,
                message: "Your board was edited succesfully!",
              });
            });
          },
        }}
      >
        <DialogTitle>Edit board</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            name="title"
            defaultValue={boardContext?.title}
            label="Board title"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose(setShowEdit);
            }}
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={showInv}
        onClose={() => {
          handleClose(setShowInv);
        }}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const url = import.meta.env.VITE_API_URL + `invite/`;
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const data = { receivers: [formJson.email] };
            axios.post(url, data).then((response) => {
              setSnack({
                state: true,
                message: "Your friend has been invited!",
              });
              boardContext?.setTitle(response.data.title);
            });
          },
        }}
      >
        <DialogTitle>Invite people</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Invite a friend of yours to join you in this board!
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            type="email"
            name="email"
            label="Email"
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button
            color="secondary"
            onClick={() => {
              handleClose(setShowInv);
            }}
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Invite
          </Button>
        </DialogActions>
      </Dialog>
      {setSnack ? (
        <Snackbar
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          open={snack.state}
          autoHideDuration={2000}
          onClose={() => {
            setSnack({ state: false, message: "" });
          }}
          message={snack.message}
        />
      ) : null}
    </Box>
  );
}
