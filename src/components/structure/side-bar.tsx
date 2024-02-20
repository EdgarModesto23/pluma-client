import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { LogoDefault } from "../svg/logo-no-title";
import Avatar, { genConfig } from "react-nice-avatar";
import { UserInfo, useUserInfo } from "../auth/User";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import HomeIcon from "@mui/icons-material/Home";
import Snackbar from "@mui/material/Snackbar";
import { KeyboardArrowDown } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const settings = ["Update user details", "Logout"];

export default function SideBar() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const [openSettings, setOpenSettings] = React.useState(false);
  const [openAddBoard, setOpenAddBoard] = React.useState(false);

  const [updatedUser, setUpdatedUser] = React.useState({
    state: false,
    message: "",
  });
  const [showSnack, setSnack] = React.useState(false);

  const handleOpenAddBoard = () => {
    setOpenAddBoard(true);
  };

  const handleCloseAddBoard = () => {
    setOpenAddBoard(false);
  };

  const handleClickOpenSettings = () => {
    setOpenSettings(true);
  };

  const handleCloseSettings = () => {
    setOpenSettings(false);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const patchData = (
    event: React.FormEvent<HTMLFormElement>,
    url: string,
    closeHandler: () => void,
    successMethod: string
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const data = removeEmptyPairs(formJson);
    axios
      .patch(url, data)
      .then(() => {
        setUpdatedUser({
          state: true,
          message: successMethod,
        });
        setSnack(true);
      })
      .catch((error) => {
        setUpdatedUser({
          state: true,
          message: error.response.data,
        });
      });
    closeHandler();
  };

  const postData = (
    event: React.FormEvent<HTMLFormElement>,
    url: string,
    closeHandler: () => void,
    successMethod: string
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const data = removeEmptyPairs(formJson);
    axios
      .post(url, data)
      .then(() => {
        setUpdatedUser({
          state: true,
          message: successMethod,
        });
        setSnack(true);
      })
      .catch((error) => {
        setUpdatedUser({
          state: true,
          message: error.response.data,
        });
      });
    closeHandler();
  };

  const userInfo = useUserInfo();
  const baseURL = import.meta.env.VITE_API_URL;
  const url = baseURL + "user/" + userInfo?.user.id + "/";
  const post_board = baseURL + "board/";

  function removeEmptyPairs(obj) {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        acc[key] = value;
      }
      return acc;
    }, {});
  }

  const config = genConfig(userInfo?.user.email);

  React.useEffect(() => {
    const baseURL = import.meta.env.VITE_API_URL;
    const url = baseURL + "user/get";
    if (updatedUser["state"]) {
      axios
        .get(url)
        .then((response) => {
          const newUser: UserInfo = {
            id: response.data.id,
            email: response.data.email,
            username: response.data.username,
            name: response.data.name,
          };
          userInfo?.setUser(newUser);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
  }, [updatedUser, userInfo]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline enableColorScheme />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <LogoDefault height={50} width={50} />
          <Typography
            variant="h4"
            sx={{ flexGrow: 1 }}
            paddingX={1}
            noWrap
            component="div"
          >
            Pluma
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            <Button color="secondary" onClick={handleOpenUserMenu}>
              <KeyboardArrowDown />
              <Typography paddingX={1}>{userInfo?.user.username}</Typography>
              <Avatar style={{ width: "40px", height: "40px" }} {...config} />
            </Button>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => {
                    setting == "Logout"
                      ? navigate("logout/")
                      : handleClickOpenSettings();
                  }}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
              <Dialog
                open={openSettings}
                onClose={handleCloseSettings}
                PaperProps={{
                  component: "form",
                  onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                    patchData(
                      event,
                      url,
                      handleCloseSettings,
                      "User details updated successfully!"
                    );
                  },
                }}
              >
                <DialogTitle>Update user details</DialogTitle>
                <DialogContent>
                  <DialogContentText></DialogContentText>
                  <TextField
                    autoFocus
                    id="email"
                    name="email"
                    label="Email Address"
                    type="email"
                    fullWidth
                    variant="standard"
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="username"
                    name="username"
                    label="Username"
                    fullWidth
                    variant="standard"
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseSettings}>Cancel</Button>
                  <Button type="submit">Save</Button>
                </DialogActions>
              </Dialog>
            </Menu>
          </Box>
        </Toolbar>
        {setSnack ? (
          <Snackbar
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            open={showSnack}
            autoHideDuration={2000}
            onClose={() => {
              setSnack(false);
            }}
            message={updatedUser.message}
          />
        ) : null}
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["Home", "Create board"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={() => {
                  index % 2 === 0 ? navigate("/app") : handleOpenAddBoard();
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index % 2 === 0 ? <HomeIcon /> : <AddCircleIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Dialog
          open={openAddBoard}
          onClose={handleCloseAddBoard}
          PaperProps={{
            component: "form",
            onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
              postData(
                event,
                post_board,
                handleCloseAddBoard,
                "Board successfully created!"
              );
            },
          }}
        >
          <DialogTitle>Create board</DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>
            <TextField
              autoFocus
              id="title"
              name="title"
              label="Title"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAddBoard}>Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogActions>
        </Dialog>
      </Drawer>
    </Box>
  );
}
