import Input from "../../interfaces/input.interface";

export const noteForm: Input[] = [
  {
    id: 1,
    title: "Title of note",
    model: "title",
    required: true,
    placeholder: "Enter a title for note",
    type: "text",
    variant: "outlined",
  },
  {
    id: 2,
    title: "Enter a tagged note (#tag)",
    model: "details",
    required: true,
    placeholder: "Enter a tagged note (#tag)",
    type: "textarea",
    variant: "outlined",
    multiline: true,
    rows: 5,
  },
];
