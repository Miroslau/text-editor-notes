import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { Typography, Container, Stack, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Form from "../../../components/form";
import { noteForm } from "../../../constants/note/form";
import { noteType } from "../../../types/notes-type";
import { noteValidator } from "../../../validators/note-validator";
import { addNote } from "../../../utils/db";
import { NOTES } from "../../../constants/routes";
import ListOfTags from "../../../components/list-of-tags";

const useStyles = makeStyles({
  container: {
    overflow: "hidden",
    height: "100vh",
    width: "100vw",
    position: "relative",
    padding: "5px 0",
  },
});

const CreateNote = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState({});
  const [tags, setTags] = useState<string[]>([]);

  const [noteModel, setNoteModel] = useState<noteType>({
    id: Math.floor(Math.random() * 100),
    title: "",
    details: "",
    tags: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createNote = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setErrors(noteValidator(noteModel));
    setIsSubmitting(true);
    console.log("errors: ", errors);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNoteModel({
      ...noteModel,
      [event.target.name]: event.target.value,
    });
    setErrors((prevState) => ({
      ...prevState,
      [event.target.name]: null,
    }));

    if (event.target.name === "details") {
      const regex = /#(\w+)/g;
      const matchedTags = event.target.value.match(regex || []) as string[];
      setTags(matchedTags);
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      const createNote = async () => {
        try {
          setisLoading(true);
          await addNote(noteModel, tags);
          setisLoading(false);
          navigate(`${NOTES}`);
        } catch (error) {
          setisLoading(false);
        }
      };

      createNote();
    }
  }, [errors]);

  return (
    <Container className={classes.container} maxWidth={false}>
      <Typography pt={5} variant="h4">
        Create a new Note
      </Typography>
      <Form
        noValidate={true}
        isLoading={isLoading}
        autoComplete="off"
        handleChange={handleChange}
        onSubmit={createNote}
        inputs={noteForm}
        model={noteModel}
        errors={errors}
        handleCancel={navigate.bind(this, -1)}
      />
      {tags && tags.length > 0 && (
        <ListOfTags isClickable={false} tags={tags} />
      )}
    </Container>
  );
};

export default CreateNote;
