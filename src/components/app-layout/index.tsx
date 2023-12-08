import React, { FC } from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  page: {
    background: "#f9f9f9",
    width: "100%",
  },
});

const AppLayout: FC<React.PropsWithChildren> = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.page}>{children}</div>;
};

export default AppLayout;
