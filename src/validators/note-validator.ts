import { noteType } from "../types/notes-type";

interface Error {
  [key: string]: string;
}

export const noteValidator = (values: noteType): Error => {
  const errors: Error = {};
  if (!values.title.trim()) {
    errors.title = "Title for note is required";
  }

  if (!values.details.trim()) {
    errors.details = "Details for note is required";
  }

  return errors;
};
