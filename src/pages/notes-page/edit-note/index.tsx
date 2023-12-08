import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { noteType } from "../../../types/notes-type";
import { getNoteById, updateNote } from "../../../utils/db";
import { makeStyles } from "@material-ui/core";
import { Container, Typography } from "@mui/material";
import { noteForm } from "../../../constants/note/form";
import Form from "../../../components/form";
import { noteValidator } from "../../../validators/note-validator";

const useStyles = makeStyles({
  container: {
    overflow: "hidden",
    height: "100vh",
    width: "100vw",
    position: "relative",
    padding: "5px 0",
  },
});

const EditNote = () => {
  const { id } = useParams();
  const classes = useStyles();
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [note, setNote] = useState<noteType>({
    id: 0,
    title: "",
    details: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNote({
      ...note,
      [event.target.name]: event.target.value,
    });
    setErrors((prevState) => ({
      ...prevState,
      [event.target.name]: null,
    }));
  };

  const editNote = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setErrors(noteValidator(note));
    setIsSubmitting(true);
  };

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const fetchedNote = await getNoteById(Number(id));
        setNote(fetchedNote);
      } catch (error) {
        navigate(-1);
      }
    };

    fetchNote();
  }, [id]);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      const updateCurrentNote = async () => {
        try {
          setisLoading(true);
          await updateNote(Number(id), note);
          setisLoading(false);
          navigate({
            pathname: `/notes`,
          });
        } catch (error) {
          setisLoading(false);
        }
      };

      updateCurrentNote();
    }
  }, [errors]);

  return (
    <Container className={classes.container} maxWidth={false}>
      <Typography pt={5} variant="h4">
        {`Edit note ${note?.title}`}
      </Typography>
      <Form
        noValidate={true}
        isLoading={isLoading}
        autoComplete="off"
        handleChange={handleChange}
        onSubmit={editNote}
        inputs={noteForm}
        model={note}
        errors={errors}
        handleCancel={navigate.bind(this, -1)}
      />
    </Container>
  );
};

export default EditNote;
