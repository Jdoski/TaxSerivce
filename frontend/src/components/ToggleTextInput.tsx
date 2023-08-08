import {
  Button,
  Grid,
  GridContainer,
  Label,
  TextInput,
} from "@trussworks/react-uswds";
import React, { useState } from "react";

interface TextInputProps {
  label: string;
  id: string;
  type: any;
  defaultValue: string;
}

const ToggleableTextInput: React.FC<TextInputProps> = ({
  label,
  id,
  type,
  defaultValue,
}) => {
  const [disabled, setDisabled] = useState(true);

  const handleToggle = () => {
    setDisabled((prevDisabled) => !prevDisabled);
  };

  return (
    <div>
      <>
        <GridContainer>
          <Label className="usa-label" htmlFor={id}>
            {label}
          </Label>
          <Grid row>
            <TextInput
              className="usa-input"
              style={{}}
              id={id}
              name={id}
              type={type}
              defaultValue={defaultValue}
              disabled={disabled}
            />
            <Button
              type="button"
              className="usa-button usa-button--outline"
              style={{ margin: 9 }}
              onClick={handleToggle}
            >
              {disabled ? "Enable" : "Disable"}
            </Button>
          </Grid>
        </GridContainer>
      </>
    </div>
  );
};

export default ToggleableTextInput;
