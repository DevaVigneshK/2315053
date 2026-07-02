import { ToggleButton, ToggleButtonGroup } from "@mui/material";

const filters = ["All", "Placement", "Result", "Event"];

export function NotificationFilter({ value, onChange }) {

  const handleChange = (event, newValue) => {
    if (newValue !== null) {
      onChange(newValue);
    }
  };

  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={handleChange}
    >
      {filters.map((type) => (
        <ToggleButton
          key={type}
          value={type}
        >
          {type}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}