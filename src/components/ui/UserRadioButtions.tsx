import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useState, ChangeEvent } from "react";

const UserRadioButtons = () => {
  // Radio Buttons
  let radioButtons = [
    {
      value: "Faculty",
      label: "Faculty",
    },
    {
      value: "Student",
      label: "Student",
    },
  ];
  const [value, setValue] = useState(radioButtons[0].value);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        <Box
          component={"div"}
          sx={{
            display: "flex",
            gap: "7px",
            padding: "7px",
            borderRadius: "14px",
            backgroundColor: "#DBDDDE",
          }}
        >
          {radioButtons.map((item, i) => (
            <FormControlLabel
              sx={{
                margin: 0,
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                padding: "8px 16px",
                borderRadius: "10px",
                color: value === item.value ? "white" : "black",
                backgroundColor: value === item.value ? "primary.main" : "",
              }}
              key={i}
              value={item.value}
              control={
                <Radio
                  sx={{
                    display: "none",
                  }}
                />
              }
              label={item.label}
            />
          ))}
        </Box>
      </RadioGroup>
    </FormControl>
  );
};

export default UserRadioButtons;
