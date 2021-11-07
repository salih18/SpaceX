import React from "react";
import MissionCard from "../components/Card";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

export const CardListStyled = styled(Box)`
  background-color: #f8f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 4rem 1rem;
  padding: 1rem;
  max-width: 96rem;
`;

const CardList = () => {
  return (
    <CardListStyled>
      <Grid container spacing={4}>
        {[0, 1, 2].map((card) => (
          <Grid item key={card} xs={12} sm={6} md={4}>
            <MissionCard />
          </Grid>
        ))}
      </Grid>
    </CardListStyled>
  );
};

export default CardList;
