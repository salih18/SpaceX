import React from "react";
import Button from "@material-ui/core/Button";
import { TestStyled } from "./Test.styles";

const Test = () => {
  return (
    <TestStyled>
      <Button variant="contained" color="primary">
        Hello World
      </Button>
    </TestStyled>
  );
};

export default Test;
