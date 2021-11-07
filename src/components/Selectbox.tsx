import React, { useEffect, useState } from "react";
import { useLaunchesUpdate } from "./../ThemeContext";
import { useQuery, gql, useApolloClient } from "@apollo/client";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

import { GET_MISSION_NAMES, QUERY_LAUNCH_PROFILE } from "../graphQL/queries";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface IState {
  missions: {
    id: string;
    mission_name: string;
    firstLetter: string;
  }[];
}

export default function Selectbox() {
  const client = useApolloClient();
  const updateLaunches = useLaunchesUpdate();
  const { data } = useQuery(GET_MISSION_NAMES);

  const [missions, setMissions] = useState<IState["missions"]>([]);
  const [selectedMissions, setSelectedMissions] = useState<IState["missions"]>(
    []
  );

  useEffect(() => {
    if (selectedMissions.length) {
      const fetchData = async () => {
        try {
          const promises = selectedMissions.map(async (item) => {
            return await client.query({
              query: QUERY_LAUNCH_PROFILE,
              variables: { id: Number(item.id) },
            });
          });

          const results = await Promise.allSettled(promises);

          // eslint-disable-next-line array-callback-return
          const launches = results.map((l) => {
            if (l.status === "fulfilled") {
              return l.value.data.launch;
            }
          });
          updateLaunches(launches);
        } catch (e) {
          console.error(e);
        }
      };
      fetchData();
    } else {
      updateLaunches([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMissions]);

  useEffect(() => {
    if (data) {
      const options = data.launches.map(
        (option: { id: string; mission_name: string }) => {
          const firstLetter = option.mission_name[0].toUpperCase();
          return {
            firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
            ...option,
          };
        }
      );
      setMissions(options);
    }
  }, [data]);
  return (
    <Autocomplete
      multiple
      color="secondary"
      id="missions"
      options={missions.sort(
        (a: any, b: any) => -b.firstLetter.localeCompare(a.firstLetter)
      )}
      groupBy={(option) => option.firstLetter}
      disableCloseOnSelect
      getOptionLabel={(option) => option.mission_name}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.mission_name}
        </li>
      )}
      style={{
        width: 500,
        backgroundColor: "#f2e2f5",
        color: "#9c27b0",
        borderRadius: "4px",
      }}
      renderInput={(params) => (
        <TextField {...params} color="secondary" placeholder="Search" />
      )}
      value={selectedMissions}
      onChange={(event, newValue) => {
        setSelectedMissions(newValue);
      }}
    />
  );
}
