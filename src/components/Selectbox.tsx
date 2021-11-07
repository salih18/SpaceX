import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

import { GET_MISSION_NAMES} from "../graphQL/queries";

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
  const { error, loading, data } = useQuery(GET_MISSION_NAMES);

  const [missions, setMissions] = useState<IState["missions"]>([]);
  const [selected, setSelected] = useState<IState["missions"]>([]);

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
      value={selected}
      onChange={(event, newValue) => {
        setSelected(newValue);
      }}
    />
  );
}
