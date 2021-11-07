import React from "react";
import Navbar from "../layouts/Navbar";
import CardList from "../layouts/CardList";
import Container from "@mui/material/Container";

const Home = () => {
  return (
    <>
      <Navbar />
      <Container>
        <CardList />
      </Container>
    </>
  );
};

export default Home;
