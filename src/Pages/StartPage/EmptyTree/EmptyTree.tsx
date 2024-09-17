import React from "react";
import { Typography, Stack } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import AddPersonButton from "./AddPersonButton";

const EmptyTree = () => {
  return (
    <Stack alignItems={"center"}>
      <Typography variant="h6">
        Det verkar som att ditt släktträd är tomt
      </Typography>
      <Typography variant="body1">
        Du kan börja med att lägga till dig själv i trädet
      </Typography>
      <AddPersonButton />
    </Stack>
  );
};

export default EmptyTree;
