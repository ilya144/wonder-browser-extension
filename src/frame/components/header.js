import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Fab, Link } from "@material-ui/core";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

const useStyles = makeStyles(theme => ({
  header: {
    background: "linear-gradient(45deg, #602b9a 15%, #ab2be6 70%)"
  },
  toolbarBoxWS: {
    padding: theme.spacing(1)
  },
  toolbarTitleWonder: {
    fontWeight: 400,
    color: "#fff"
  },
  toolbarTitle: {
    paddingRight: theme.spacing(3),
    color: "#fff",
    fontWeight: "100"
  },
  fab: {
    margin: theme.spacing(1),
    color: "#9d71c6",
    backgroundColor: "#ffffff",
    fontSize: "1.021em",
    fontWeight: "bold"
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
    color: "#565656"
  }
}));

const Header = props => {
  const classes = useStyles();

  return (
    <Box className={classes.header} display="flex" pt="40px">
      <Box
        className={classes.toolbarBoxWS}
        flexGrow={1}
        display="flex"
        alignItems="center"
      >
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          className={classes.toolbarTitleWonder}
          noWrap
        >
          Wonder
        </Typography>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          noWrap
          className={classes.toolbarTitle}
        >
          Sourcing
        </Typography>
      </Box>
      <Link target="_blank" href="https://wondersourcing.ru/customers/edit" style={{textDecoration: "none"}}>
        <Fab variant="extended" aria-label="delete" className={classes.fab}>
          АККАУНТ
          <ExpandLessIcon className={classes.extendedIcon} />
        </Fab>
      </Link>
    </Box>
  );
};

export default Header;