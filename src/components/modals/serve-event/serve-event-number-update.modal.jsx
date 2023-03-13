import React, { useState } from "react";
import { Card, CardContent, TextField, Stack } from "@mui/material";
import "./serve.styles.scss";
import { Typography, Button } from "@mui/material";
const NumberUpdateModal = ({
  isOpened = true,
  children,
  onUpdate,
  onClose,
  ePlanned,
  eActual,
  mPlanned,
  mActual,
}) => {
  const [plannedCount, setPlannedCount] = useState(parseInt(ePlanned) || 0);
  const [actualCount, setActualCount] = useState(parseInt(eActual) || 0);
  const [mealPlannedCount, setMealPlannedCount] = useState(
    parseInt(mPlanned) || 0
  );
  const [mealActualCount, setMealActualCount] = useState(
    parseInt(mActual) || 0
  );
  if (!isOpened) {
    return null;
  }
  const handleNumberUpdate = () => {
    const newJson = {
      plannedCount,
      actualCount,
      mealPlannedCount,
      mealActualCount,
    };
    onUpdate(newJson);
  };
  return (
    <div>
      <div className="success-message__wrapper">
        <div className="modal__warning__banner">
          <Typography variant="h5">ATTENTION</Typography>
        </div>
        <div className="success-message__message" style={{ marginTop: "20px" }}>
          <Typography variant="h5">
            Event is complete, please confirm numbers.
          </Typography>
        </div>
        <Card>
          <Stack align="center">
            <div style={{ marginBottom: "5px" }}>Event Numbers</div>
            <Stack direction="row" justifyContent="center">
              <TextField
                label="Planned"
                type="number"
                value={plannedCount}
                onChange={(e) => setPlannedCount(e.target.value)}
                inputProps={{
                  min: 0,
                  max: 100,
                  step: 1,
                  style: {
                    padding: "5px 10px",
                    textAlign: "center",
                  },
                }}
              />
              <TextField
                label="Actual"
                type="number"
                value={actualCount}
                onChange={(e) => setActualCount(e.target.value)}
                inputProps={{
                  min: 0,
                  max: 100,
                  step: 1,
                  style: {
                    padding: "5px 10px",
                    textAlign: "center",
                  },
                }}
              />
            </Stack>
          </Stack>

          <Stack align="center">
            <div style={{ marginBottom: "5px" }}>Meal Numbers</div>
            <Stack direction="row" justifyContent="center">
              <TextField
                label="RSVPs"
                type="number"
                value={mealPlannedCount}
                onChange={(e) => setMealPlannedCount(e.target.value)}
                inputProps={{
                  min: 0,
                  max: 100,
                  step: 1,
                  style: {
                    padding: "5px 10px",
                    textAlign: "center",
                  },
                }}
              />
              <TextField
                label="Actual"
                type="number"
                value={mealActualCount}
                onChange={(e) => setMealActualCount(e.target.value)}
                inputProps={{
                  min: 0,
                  max: 100,
                  step: 1,
                  style: {
                    padding: "5px 10px",
                    textAlign: "center",
                  },
                }}
              />
            </Stack>
          </Stack>
        </Card>
        <div className="success-message__message">
          <Typography variant="h6">{children}</Typography>
        </div>
        <div
          className="success-message__button-wrapper"
          style={{ marginBottom: "10px" }}
        >
          <Button
            variant="contained"
            onClick={handleNumberUpdate}
            sx={{
              // backgroundColor: 'blue',
              margin: 2,
              minWidth: "150px",
            }}
          >
            Update
          </Button>
          <Button
            variant="contained"
            onClick={onClose}
            sx={{
              backgroundColor: "yellow",
              color: "black",
              margin: 2,
              minWidth: "150px",
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NumberUpdateModal;
