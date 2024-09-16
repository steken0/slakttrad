import React from "react";
import { Typography, Container, Stack } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";

const AddPersonButton = () => {
  return (
    <Stack
      spacing={1}
      justifyContent="center"
      alignItems={"center"}
      py={2}
      px={4}
      sx={{ border: "2px dotted gray", borderRadius: 4 }}
    >
      <PersonAddOutlinedIcon fontSize="large" />
      <Typography variant="body1">Lägg till person</Typography>
    </Stack>
  );
};

export default AddPersonButton;
