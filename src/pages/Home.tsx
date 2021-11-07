import React, { useState } from "react";
import Navbar from "../layouts/Navbar";
import CardList from "../layouts/CardList";
import Container from "@mui/material/Container";

const Home = () => {
  const [selected, setSelected] = useState<IState["missions"]>([]);

  return (
    <>
      <Navbar />
      <Container>
        <CardList />
      </Container>
    </>
  );
};

interface IState {
  missions: {
    id: string;
    mission_name: string;
    firstLetter: string;
  }[];
}

export default Home;
