import React from "react";
import { Typography, Container } from "@mui/material";
import { useFamilyTree } from "../../Contexts/FamilyTreeContext";
import FamilyTree from "./FamilyTree/FamilyTree";

import EmptyTree from "./EmptyTree/EmptyTree";

const StartPage = () => {
  const { nodes } = useFamilyTree();
  return (
    <Container sx={{ alignItems: "center" }}>
      {nodes.size > 0 ? <FamilyTree /> : <EmptyTree />}
    </Container>
  );
};

export default StartPage;
