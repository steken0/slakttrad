import { useState } from "react";
import { Typography, Button, Stack } from "@mui/material";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import PersonDialog from "../../../Components/Dialogs/PersonDialog";

const AddPersonButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <PersonDialog open={open} onClose={() => setOpen(false)} />
      <Button onClick={() => setOpen(true)}>
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
      </Button>
    </>
  );
};

export default AddPersonButton;
