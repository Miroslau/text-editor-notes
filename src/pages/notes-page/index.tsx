import React, { useEffect, useState } from "react";
import { Button, Container, Grid, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import NoteCard from "../../components/note-card";
import { deleteNote, getNotes } from "../../utils/db";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteNotes,
  noteSelector,
  setError,
  setNotes,
} from "../../store/slices/note-slice";
import { useNavigate } from "react-router-dom";
import { CREATE_NOTE, EDIT_NOTE, NOTES } from "../../constants/routes";
import { noteType } from "../../types/notes-type";

const useStyles = makeStyles(() => ({
  container: {
    overflow: "hidden",
    height: "100vh",
    width: "100vw",
    position: "relative",
    padding: "5px 0",
  },
  buttonContainer: {
    padding: "20px 0",
    display: "flex",
    alignItems: "center",
  },
}));

const NotesPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filteredNotes, setFilteredNotes] = useState<noteType[]>([]);

  const { notes, status } = useSelector(noteSelector);
  const navigateCreatePage = () => navigate(`${CREATE_NOTE}`);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await getNotes();

        if (status === "success") {
          dispatch(setNotes(data || []));
        } else {
          dispatch(setError("Failed to fetch notes"));
        }
      } catch (error) {
        dispatch(setError("Failed to fetch notes"));
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (notes) {
      setFilteredNotes(notes);
    }
  }, [notes]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error loading notes</div>;
  }

  const handleDelete = async (id: number) => {
    await deleteNote(id);
    dispatch(deleteNotes(id));
  };

  const filterNotes = (tags: string[]) => {
    const newFilteredNotes =
      notes &&
      notes.filter((note) =>
        tags.every(
          (selectedTag) => note.tags && note.tags.includes(selectedTag),
        ),
      );
    if (newFilteredNotes) {
      setFilteredNotes(newFilteredNotes);
    }
  };

  const handleEdit = (id: number) =>
    navigate({
      pathname: `/edit-note/${id}`,
    });

  return (
    <Container className={classes.container} maxWidth={false}>
      <Typography pt={5} variant="h4">
        My notes
      </Typography>
      <div className={classes.buttonContainer}>
        <Button variant="contained" onClick={navigateCreatePage}>
          Add note
        </Button>
      </div>
      <Grid container spacing={3} pt={5}>
        {filteredNotes &&
          filteredNotes.map((note) => (
            <Grid item xs={12} md={6} lg={4} key={note.id}>
              <NoteCard
                note={note}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                filterHandle={filterNotes}
              />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default NotesPage;
