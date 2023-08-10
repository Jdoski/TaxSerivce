import { Grid, GridContainer, Label, TextInput } from "@trussworks/react-uswds";
import React from "react";

interface TextInputProps {
  label: string;
  id: string;
  type: any;
  defaultValue: string;
  disabled: boolean;
  onChange: any;
}

const ToggleableTextInput: React.FC<TextInputProps> = ({
  label,
  id,
  type,
  defaultValue,
  disabled,
  onChange,
}) => {
  return (
    <div>
      <>
        <GridContainer>
          <Label
            style={{ margin: "auto", marginBottom: 5 }}
            className="usa-label"
            htmlFor={id}
          >
            {label}
          </Label>
          <Grid row>
            <TextInput
              key={id}
              className="usa-input"
              style={{ margin: "auto" }}
              id={id}
              name={id}
              type={type}
              defaultValue={defaultValue}
              disabled={disabled}
              onChange={onChange}
            />
          </Grid>
        </GridContainer>
      </>
    </div>
  );
};

export default ToggleableTextInput;
