import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function EventStatusSelect({ value, onChange }) {
  /*
        The state transitions are as follows
        state               options
        -----------------------------------------------------
        draft               review | cancel
        review              draft | cancel | approved
        cancelled           draft
        approved            draft | cancel | 
        done                draft
    */
  const eventOptions = [];
  switch (value) {
    case "draft":
      eventOptions.push({ id: "draft", name: "Draft" });
      eventOptions.push({ id: "review", name: "Ready for Review" });
      eventOptions.push({ id: "cancel", name: "Cancel" });
      eventOptions.push({ id: "delete", name: "Delete" });
      break;
    case "review":
      eventOptions.push({ id: "review", name: "In review" });
      eventOptions.push({ id: "draft", name: "Return to Coordinator" });
      eventOptions.push({ id: "approved", name: "Approve" });
      eventOptions.push({ id: "cancel", name: "Cancel" });
      eventOptions.push({ id: "delete", name: "Delete" });
      break;
    case "approved":
      eventOptions.push({ id: "approved", name: "Approved" });
      eventOptions.push({ id: "draft", name: "Return to Coordinator" });
      eventOptions.push({ id: "review", name: "Back to Review" });
      eventOptions.push({ id: "cancel", name: "Cancel" });
      eventOptions.push({ id: "delete", name: "Delete" });
      break;
    case "cancel":
      eventOptions.push({ id: "cancel", name: "Cancelled" });
      eventOptions.push({ id: "draft", name: "Back to Draft" });
      eventOptions.push({ id: "delete", name: "Delete" });
      break;
    case "delete":
      eventOptions.push({ id: "delete", name: "Deleted" });
      eventOptions.push({ id: "draft", name: "Undelete to Draft" });
      break;

    default:
      break;
  }

  return (
    <>
      <InputLabel id="meeting-state-select-label">Event Status</InputLabel>
      <Select
        labelId="meeting-state-select-label"
        id="meeting-state-select"
        style={{ padding: "0px", margin: "0px" }}
        value={value}
        onChange={onChange}
        sx={{
          "& .Mui-selected.Mui-select-approved": {
            color: "green",
            backgroundColor: "green",
          },
          "& .Mui-selected.Mui-select-rejected": {
            color: "white",
            backgroundColor: "red",
          },
        }}
      >
        {eventOptions.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </>
  );
}
