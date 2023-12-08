import React, { FC } from "react";
import { noteType } from "../../types/notes-type";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import { DeleteOutlined, EditOutlined } from "@mui/icons-material";
import ListOfTags from "../list-of-tags";

interface NoteProps {
  note: noteType;
  handleEdit: (args?: any) => void;
  handleDelete: (args?: any) => void;
  filterHandle: (args?: any) => void;
}

const NoteCard: FC<NoteProps> = ({
  note,
  handleDelete,
  handleEdit,
  filterHandle,
}) => {
  return (
    <div>
      <Card elevation={1}>
        <CardHeader
          action={
            <>
              <IconButton onClick={handleEdit.bind(this, note.id)}>
                <EditOutlined />
              </IconButton>
              <IconButton onClick={handleDelete.bind(this, note.id)}>
                <DeleteOutlined />
              </IconButton>
            </>
          }
          title={note.title}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            {note.details.replace(/#\w+/g, "")}
          </Typography>
          {note?.tags && note.tags.length > 0 && (
            <ListOfTags
              tags={note.tags}
              isClickable={true}
              chipClick={filterHandle}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default NoteCard;
