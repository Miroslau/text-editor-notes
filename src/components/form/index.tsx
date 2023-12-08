import React, { FC } from "react";
import Input from "../../interfaces/input.interface";
import TextInput from "./text-input";
import { Button, Stack } from "@mui/material";

interface FormProps {
  noValidate: boolean;
  autoComplete: string;
  handleChange: (args?: any) => void;
  handleCancel: (args?: any) => void;
  onSubmit: (args?: any) => void;
  inputs: Input[];
  model: any;
  errors: any;
  isLoading: boolean;
}

const DynamicComponent = (input: Input): React.FC | React.Component | any => {
  const type = input.type || "";
  switch (type) {
    case "text":
      return TextInput;
    default:
      return TextInput;
  }
};

const Form: FC<FormProps> = ({
  noValidate,
  autoComplete,
  onSubmit,
  inputs,
  model,
  errors,
  handleChange,
  handleCancel,
  isLoading,
}) => {
  return (
    <form
      noValidate={noValidate}
      autoComplete={autoComplete}
      onSubmit={onSubmit}
    >
      {inputs.map((input) => {
        const Component = DynamicComponent(input);

        return (
          <Component
            key={input.id}
            id={input.id}
            value={model[`${input.model}`]}
            name={input.model}
            type={input.type}
            title={input.title}
            variant={input.variant}
            required={input.required}
            inputText={handleChange}
            helperText={errors[`${input.model}`]}
            label={input.title}
            multiline={input.multiline}
            rows={input.rows}
          />
        );
      })}
      <Stack direction="row" spacing={2}>
        <Button variant="contained" color="error" onClick={handleCancel}>
          Cancel creating
        </Button>
        <Button variant="contained" type="submit" disabled={isLoading}>
          Create
        </Button>
      </Stack>
    </form>
  );
};

export default Form;
