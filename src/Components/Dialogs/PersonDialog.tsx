import {
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  InputLabel,
} from "@mui/material";
import { useState } from "react";
import {
  useFamilyTree,
  Person,
  defaultPerson,
} from "../../Contexts/FamilyTreeContext";
import { useTranslation } from "react-i18next";
import GenderSwitch from "../GenderSwitch";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { de } from "date-fns/locale";

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
  const { addNode, editNode } = useFamilyTree();
  const [error, setError] = useState<string | undefined>(undefined);

  //Local state of person form
  const [personForm, setPersonForm] = useState<Person>({
    ...defaultPerson,
    ...person,
  });

  const validatePerson = (person: Person) => {
    //TODO validate person
    return true;
  };

  const onOk = () => {
    if (person) {
      editNode(person.id, personForm);
    } else {
      addNode(personForm);
    }
    onClose();
  };

  const minDate = new Date("1000-01-01");

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
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
          <Stack py={2} spacing={2}>
            <TextField
              id="Name"
              label="Namn"
              variant="outlined"
              onChange={(e) => {
                setPersonForm({ ...personForm, name: e.target.value });
              }}
            />
            <Stack>
              <Typography sx={{ pl: 1 }} variant="body1">
                {t("Kön")}
              </Typography>

              <Stack direction={"row"} alignItems={"center"}>
                <GenderSwitch
                  id="gender"
                  checked={personForm.gender === "female"}
                  onChange={(e) =>
                    setPersonForm({
                      ...personForm,
                      gender: e.target.checked ? "female" : "male",
                    })
                  }
                />
                <label htmlFor="gender">
                  <Typography
                    variant="body2"
                    sx={{
                      cursor: "pointer",
                      minWidth: "4em",
                      minHeight: "2em",
                      alignContent: "center",
                    }}
                  >
                    {personForm.gender}
                  </Typography>
                </label>
              </Stack>
            </Stack>

            <TextField
              id="information"
              label="Om mig"
              variant="outlined"
              multiline={true}
              minRows={4}
              maxRows={10}
              onChange={(e) => {
                setPersonForm({ ...personForm, information: e.target.value });
              }}
            />

            <InputLabel>{t("Born date")}</InputLabel>
            <DatePicker
              value={personForm.birthDate}
              showDaysOutsideCurrentMonth={true}
              onChange={(newDate) => {
                if (newDate == null) return;
                setPersonForm({ ...personForm, birthDate: newDate });
                // Give warning if death date is before birth date
                if (
                  personForm.deathDate != null &&
                  personForm.deathDate < newDate
                ) {
                  setError(t("Death date must be after birth date"));
                }
              }}
              minDate={minDate}
            />

            <InputLabel>{t("Death date (If applicable)")}</InputLabel>
            <DatePicker
              value={personForm.deathDate}
              showDaysOutsideCurrentMonth={true}
              onChange={(newDate) => {
                if (newDate == null) return;
                setPersonForm({ ...personForm, deathDate: newDate });
              }}
              minDate={personForm.birthDate}
            />
          </Stack>
          {error && (
            <Typography variant="body1" color="error">
              {error}
            </Typography>
          )}
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => {
              onClose();
            }}
          >
            {t("Cancel")}
          </Button>
          <Button onClick={onOk}>
            {person != undefined ? t("Spara") : t("Skapa")}
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};

export default PersonDialog;
