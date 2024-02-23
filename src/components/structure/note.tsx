import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Snackbar,
  TextField,
} from "@mui/material";
import { HighlightOff } from "@mui/icons-material";
import SettingsIcon from "@mui/icons-material/Settings";
import { CirclePicker } from "react-color";
import axios from "axios";
import { noteInfo, useBoardContext } from "./board-context";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import SanitizedHTML from "./sanitize";
import { boardInfo } from "./board";

interface Props {
  content: noteInfo;
  handler: (newNote: Array<noteInfo>) => void;
  board: boardInfo;
}

export default function BasicCard({ content, handler, board }: Props) {
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openSettings, setOpenSettings] = React.useState(false);
  const [openEditor, setOpenEditor] = React.useState(false);
  const [color, setColor] = React.useState(content.color);
  const [snack, setSnack] = React.useState({ state: false, message: "" });
  const [text, setText] = React.useState(content.body);
  const handleChangeColor = (color: string) => {
    setColor(color);
  };

  const handleClickOpen = (handler: (value: boolean) => void) => {
    handler(true);
  };

  const handleClose = (handler: (value: boolean) => void) => {
    handler(false);
  };

  const base_url = import.meta.env.VITE_API_URL + "note/";
  const boardContext = useBoardContext();
  return (
    <Box>
      <Card
        sx={{ minWidth: 275, backgroundColor: content.color, maxWidth: 375 }}
      >
        <CardHeader
          sx={{
            display: "flex",
            overflow: "hidden",
            "& .MuiCardHeader-content": {
              overflow: "hidden",
            },
          }}
          action={
            <IconButton
              onClick={() => {
                handleClickOpen(setOpenDelete);
              }}
            >
              <HighlightOff />
            </IconButton>
          }
          title={content.title}
          titleTypographyProps={{
            noWrap: true,
            sx: { overflow: "hidden", maxWidth: "30" },
          }}
        />
        <CardContent>
          <Typography sx={{ mb: 1.5, overflow: "hidden" }} color="#EBF2FA">
            <SanitizedHTML htmlString={content.body} />
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Button
            size="small"
            onClick={() => {
              handleClickOpen(setOpenEditor);
            }}
            color="secondary"
          >
            Edit note
          </Button>
          <IconButton
            onClick={() => {
              handleClickOpen(setOpenSettings);
            }}
            sx={{ marginLeft: "auto" }}
          >
            <SettingsIcon />
          </IconButton>
        </CardActions>
      </Card>
      {/* Delete note dialog */}
      <Dialog
        open={openDelete}
        onClose={() => {
          handleClose(setOpenDelete);
        }}
        PaperProps={{
          component: "form",
          onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
            const url = base_url + `${content.id}/`;
            event.preventDefault();
            await axios.delete(url).then(() => {
              const newNotes: Array<noteInfo> = board.notes.filter(
                (note) => note.id != content.id
              );
              setSnack({
                state: true,
                message: "Note was deleted successfully!",
              });
              handler(newNotes);
              boardContext?.setNotes(newNotes);
            });
            handleClose(setOpenDelete);
          },
        }}
      >
        <DialogTitle>Delete note</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You're about to delete this note permanently. Are you sure you want
            to continue?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="secondary"
            onClick={() => {
              handleClose(setOpenDelete);
            }}
          >
            Cancel
          </Button>
          <Button type="submit" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Setting dialog */}

      <Dialog
        open={openSettings}
        onClose={() => {
          handleClose(setOpenSettings);
        }}
        PaperProps={{
          component: "form",
          onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
            const url = base_url + `${content.id}/`;
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            formJson.color = color;
            await axios.patch(url, formJson).then((response) => {
              const updatedNote: noteInfo = response.data;
              const newNotes: Array<noteInfo> = board.notes.map((note) =>
                note.id == content.id ? updatedNote : note
              );
              handler(newNotes);
              setSnack({
                state: true,
                message: "Note details modified successfully!",
              });
            });
            handleClose(setOpenSettings);
          },
        }}
      >
        <DialogTitle>Settings</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            name="title"
            label="Title"
            fullWidth
            defaultValue={content.title}
            variant="outlined"
          ></TextField>
          <Box paddingY={2}>
            <Typography paddingY={1}>Note color</Typography>
            <CirclePicker
              onChange={(newColor) => {
                handleChangeColor(newColor.hex);
              }}
              colors={["#419D78", "#4C5454", "#FF715B", "#F7D08A", "#523F38"]}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            color="secondary"
            onClick={() => {
              handleClose(setOpenSettings);
            }}
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* open note editor */}
      <Dialog
        open={openEditor}
        onClose={() => {
          handleClose(setOpenEditor);
        }}
        PaperProps={{
          component: "form",
          onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
            const url = base_url + `${content.id}/`;
            event.preventDefault();
            const formJson = { body: text };
            await axios.patch(url, formJson).then((response) => {
              const updatedNote: noteInfo = response.data;
              const newNotes: Array<noteInfo> = board.notes.map((note) =>
                note.id == content.id ? updatedNote : note
              );
              handler(newNotes);
              setSnack({
                state: true,
                message: "Note was edited successfully!",
              });
            });
            handleClose(setOpenEditor);
          },
        }}
      >
        <DialogTitle sx={{ backgroundColor: content.color }}>
          Edit note
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: content.color }}>
          <ReactQuill theme="snow" value={text} onChange={setText} />
        </DialogContent>
        <DialogActions sx={{ backgroundColor: content.color }}>
          <Button
            color="secondary"
            onClick={() => {
              handleClose(setOpenEditor);
            }}
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Save
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
