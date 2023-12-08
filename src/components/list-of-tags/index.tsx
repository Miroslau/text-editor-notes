import React, { FC, useState } from "react";
import { Chip, Stack } from "@mui/material";

interface Prop {
  tags: string[];
  isClickable: boolean;
  chipClick?: (args: any) => void;
}

const selectedTags: string[] = [];

const ListOfTags: FC<Prop> = ({ tags, isClickable, chipClick }) => {
  const [clickedTags, setClickedTags] = useState<string[]>([]);

  const handleClick = (tag: string) => {
    if (clickedTags.includes(tag)) {
      const idx = clickedTags.indexOf(tag);
      if (idx !== -1) {
        selectedTags.splice(idx, 1);
      }
      setClickedTags((prevClickedTags) =>
        prevClickedTags.filter((clickedTag) => clickedTag !== tag),
      );
    } else {
      selectedTags.push(tag);
      setClickedTags((prevClickedTags) => [...prevClickedTags, tag]);
    }

    if (chipClick) {
      chipClick(selectedTags);
    }
  };
  return (
    <Stack direction="row" spacing={1} mt={2}>
      {tags.map((tag, index) => (
        <Chip
          label={tag}
          key={index}
          onClick={isClickable ? handleClick.bind(this, tag) : undefined}
          variant={
            clickedTags.includes(tag) ? ("primary" as any) : ("outlined" as any)
          }
          color="primary"
        />
      ))}
    </Stack>
  );
};

export default ListOfTags;
