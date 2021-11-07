import React, { useEffect, useState } from "react";
import { useLaunches } from "./../ThemeContext";

import { useQuery, gql } from "@apollo/client";

import MissionCard from "../components/Card";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { LAUNCHES_QUERY } from "../graphQL/queries";

export const CardListStyled = styled(Box)`
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 4rem 1rem;
  padding: 1rem;
  max-width: 96rem;
`;
interface IState {
  launches: {
    id: string;
    mission_name: string;
    launch_date_local: string;
    launch_success: boolean;
    details: string;
    rocket: {
      rocket: {
        mass: {
          kg: number;
        };
        first_stage: {
          fuel_amount_tons: number;
        };
      };
      rocket_name: string;
    };
    links: {
      article_link: string;
      flickr_images: string[];
    }[];
  }[];
}

const CardList = () => {
  const selectedLaunches: any = useLaunches();

  const { data, loading } = useQuery(LAUNCHES_QUERY, {
    variables: { limit: 10 },
  });

  const [launches, setLaunches] = useState<IState["launches"]>([]);

  useEffect(() => {
    if (selectedLaunches.length) {
      setLaunches(selectedLaunches);
    } else if (data?.launches.length && !loading) {
      setLaunches(data.launches);
    }
  }, [data, loading, selectedLaunches]);

  if (loading) return <h3>Loading...</h3>;
  return (
    <CardListStyled>
      <Grid container spacing={4}>
        {launches.map((launch: any) => (
          <Grid item key={launch.id} xs={12} sm={6} md={4}>
            <MissionCard launch={launch} />
          </Grid>
        ))}
      </Grid>
    </CardListStyled>
  );
};

export default CardList;
