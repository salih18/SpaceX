import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import { TestStyled } from "./Test.styles";

const Test = () => {
  return (
    <TestStyled>
      <Stack direction="row" spacing={2}>
        <Button color="secondary">Secondary</Button>
        <Button variant="contained" color="success">
          Success
        </Button>
        <Button variant="outlined" color="error">
          Error
        </Button>
      </Stack>
    </TestStyled>
  );
};

export default Test;
