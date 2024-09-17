import { Typography, Container, Stack, Box } from "@mui/material";
import { useFamilyTree } from "../../../Contexts/FamilyTreeContext";
import AddPersonButton from "../EmptyTree/AddPersonButton";

const StartPage = () => {
  const { nodes } = useFamilyTree();
  return (
    <Container sx={{ alignItems: "center" }}>
      <Stack spacing={2}>
        {Array.from(nodes).map(([id, node]) => (
          <Box key={id} sx={{ border: "2px solid gray", borderRadius: 4 }}>
            <Typography variant="h6">{node.name}</Typography>
            <Typography variant="body1">{node.gender}</Typography>
            <Typography variant="body1">{node.information}</Typography>
          </Box>
        ))}
        <AddPersonButton />
      </Stack>
    </Container>
  );
};

export default StartPage;
