import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Selectbox from "../components/Selectbox";
import Container from "@mui/material/Container";
import SpaceXLogo from "./../assets/SpaceX-Logo.svg";

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

const StyledLogo = styled("div")(({ theme }) => ({
  height: "60px",
  paddingTop: theme.spacing(0),
  paddingBottom: theme.spacing(0),
  display: "flex",
}));

export default function SearchAppBar() {
  return (
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      <AppBar position="static" color="secondary">
        <Container>
          <StyledToolbar>
            <Box
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              <StyledLogo>
                <img src={SpaceXLogo} style={{ width: 320 }} alt="logo" />
              </StyledLogo>
            </Box>
            <Search color="secondary">
              <Selectbox />
            </Search>
          </StyledToolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
