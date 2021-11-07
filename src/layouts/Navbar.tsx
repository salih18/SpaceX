import * as React from "react";
import { useQuery, gql } from "@apollo/client";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Selectbox from "../components/Selectbox";
import { LAUNCHES_QUERY } from "../graphQL/queries";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  border: "none",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: "flex-start",
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(5),
  // Override media queries injected by theme.mixins.toolbar
  "@media all": {
    minHeight: 64,
  },
}));

export default function SearchAppBar() {
  const { data: launches } = useQuery(LAUNCHES_QUERY, {
    variables: { limit: 3 },
  });
  console.log(
    "🚀 ~ file: Selectbox.tsx ~ line 25 ~ Selectbox ~ launches",
    launches
  );
  return (
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      <AppBar position="static" color="secondary">
        <StyledToolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            SpaceX
          </Typography>
          <Search color="secondary">
            <Selectbox />
          </Search>
        </StyledToolbar>
      </AppBar>
    </Box>
  );
}
