import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Avatar, Grid } from "@material-ui/core";
import { PhoneInTalk, Email, Visibility } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  userAvatar: {
    width: 60,
    height: 60
  },
  userGrid: {
    marginLeft: "20px",
    height: "100%",
    flexWrap: "nowrap"
  },
  gridText: {
    fontSize: "0.91em"
  },
  gridTitle: {
    color: "#47a5fd"
  },
  eye: {
    color: "#8f2bca"
  },
  leftIcon: {
    color: "#727272"
  },
  typoMail: {
    textDecoration: "underline"
  }
}));

const User = props => {
  const classes = useStyles();

  return (
    <Box>
      <Box display="flex" alignItems="center" m="10px" height="64px">
        <Avatar
          className={classes.userAvatar}
          src="https://avatars3.githubusercontent.com/u/12969866?s=460&v=4"
        />
        <Grid
          container
          direction="column"
          justify="space-between"
          alignItems="flex-start"
          className={classes.userGrid}
        >
          <Typography variant="h6">Ivan Ivanov</Typography>
          <Typography className={classes.gridText}>
            Usa, America
            <br />
            Some text
          </Typography>
        </Grid>
      </Box>
      <Box>
        <Typography className={classes.gridTitle}>Контакты</Typography>
        <Grid>
          <Grid container direction="row" justify="space-between">
            <PhoneInTalk className={classes.leftIcon} />
            <Typography>+7 (000) 123 45 09</Typography>
            <Visibility className={classes.eye} />
          </Grid>
          <Grid container direction="row" justify="space-between">
            <Email className={classes.leftIcon} />
            <Typography className={classes.typoMail}>
              client@email.com
            </Typography>
            <Visibility className={classes.eye} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default User;
