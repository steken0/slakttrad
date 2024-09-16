import {
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { useState } from "react";
import {
  useFamilyTree,
  Person,
  defaultPerson,
} from "../../Contexts/FamilyTreeContext";
import { useTranslation } from "react-i18next";

const PersonDialog = ({
  open,
  onClose,
  person,
}: {
  open: boolean;
  onClose: () => void;
  person?: Person; // If null, we should create a new person
}) => {
  const [t] = useTranslation();
  const [legalConsent, setLegalConsent] = useState(false);
  const { addNode, editNode } = useFamilyTree();

  //Local state of person form
  const [personForm, setPersonForm] = useState<Person>({
    ...defaultPerson,
    ...person,
  });

  const onOk = () => {
    if (person) {
      editNode(person.id, personForm);
    } else {
      addNode(personForm);
    }
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        onClose();
      }}
      fullWidth={true}
      maxWidth="xs"
    >
      <DialogTitle>
        {person != undefined ? t("Redigera person") : t("Skapa ny person")}
      </DialogTitle>
      <DialogContent>
        <Stack></Stack>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={() => {
            onClose();
          }}
        >
          {t("Cancel")}
        </Button>
        <Button onClick={onOk} disabled={!legalConsent}>
          {person != undefined ? t("Spara") : t("Skapa")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PersonDialog;
