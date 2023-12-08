import React, { FC, useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { makeStyles } from "@material-ui/core";

interface TextInputProps {
  id: number;
  label?: string;
  variant?: "outlined" | "standard" | "filled" | undefined;
  value: string;
  name?: string;
  type: string;
  multiline?: boolean;
  rows?: number;
  required: boolean;
  fullWidth: boolean;
  placeholder?: string;
  inputText?: (args?: any) => void;
  helperText?: string;
}

const TextInput: FC<TextInputProps> = ({
  id,
  variant = "outlined",
  value,
  label,
  helperText,
  name,
  type,
  fullWidth = true,
  required,
  multiline,
  rows,
  placeholder,
  inputText,
}) => {
  const [currentValue, setCurrentValue] = useState(value);
  useEffect(() => {
    if (value !== currentValue) {
      setCurrentValue(value);
    }
  }, [value]);
  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setCurrentValue(event.target?.value);
  };
  return (
    <TextField
      style={{
        marginTop: 20,
        marginBottom: 20,
        display: "block",
      }}
      id={id.toString()}
      label={label}
      value={currentValue}
      helperText={helperText}
      error={!!helperText}
      variant={variant}
      name={name}
      type={type}
      fullWidth={fullWidth}
      placeholder={placeholder}
      required={required}
      onBlur={inputText}
      rows={rows}
      multiline={multiline}
      onChange={onChangeHandler}
    />
  );
};

export default TextInput;
