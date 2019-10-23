import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Typography,
  Avatar,
  Grid,
  Divider,
  Icon,
  Button,
  Link
} from "@material-ui/core";
import { PhoneInTalk, Email, Telegram, Visibility } from "@material-ui/icons";

const Skype = () => {
  return (
    <svg style={{ width: "24px", height: "24px" }} viewBox="0 0 24 24">
      <path
        fill="#727272"
        d="M18,6C20.07,8.04 20.85,10.89 20.36,13.55C20.77,14.27 21,15.11 21,16A5,5 0 0,1 16,21C15.11,21 14.27,20.77 13.55,20.36C10.89,20.85 8.04,20.07 6,18C3.93,15.96 3.15,13.11 3.64,10.45C3.23,9.73 3,8.89 3,8A5,5 0 0,1 8,3C8.89,3 9.73,3.23 10.45,3.64C13.11,3.15 15.96,3.93 18,6M12.04,17.16C14.91,17.16 16.34,15.78 16.34,13.92C16.34,12.73 15.78,11.46 13.61,10.97L11.62,10.53C10.86,10.36 10,10.13 10,9.42C10,8.7 10.6,8.2 11.7,8.2C13.93,8.2 13.72,9.73 14.83,9.73C15.41,9.73 15.91,9.39 15.91,8.8C15.91,7.43 13.72,6.4 11.86,6.4C9.85,6.4 7.7,7.26 7.7,9.54C7.7,10.64 8.09,11.81 10.25,12.35L12.94,13.03C13.75,13.23 13.95,13.68 13.95,14.1C13.95,14.78 13.27,15.45 12.04,15.45C9.63,15.45 9.96,13.6 8.67,13.6C8.09,13.6 7.67,14 7.67,14.57C7.67,15.68 9,17.16 12.04,17.16Z"
      />
    </svg>
  );
};

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
  divider: {
    margin: "10px 0"
  },
  gridText: {
    fontSize: "0.91em"
  },
  gridTitle: {
    color: "#47a5fd",
    fontWeight: 460,
    marginBottom: "10px",
    marginTop: "15px"
  },
  eye: {
    // color: "#8f2bca",
    color: "#fff"
    // "&:hover, &:focus": {
    //   cursor: "pointer"
    // }
  },
  leftIcon: {
    color: "#727272"
  },
  typoMail: {
    textDecoration: "underline"
  },
  resourceIcon: {
    width: "25px",
    height: "25px",
    margin: "8px",
    "&:hover, &:focus": {
      cursor: "pointer"
    }
  },
  contactsBtn: {
    marginTop: "10px"
  }
}));

const normalizeName = (name) => {
  return name[0].toUpperCase() + name.slice(1)
}

const User = ({ data, ...props }) => {
  const classes = useStyles();

  return (
    <Box p="12px">
      <Box display="flex" alignItems="center" m="10px" height="64px">
        <Avatar
          className={classes.userAvatar}
          // src="https://avatars3.githubusercontent.com/u/12969866?s=460&v=4"
          src={data.main_avatar}
        />
        <Grid
          container
          direction="column"
          justify="space-between"
          alignItems="flex-start"
          className={classes.userGrid}
        >
          <Typography variant="h6">
            {
              data.data_truncated===undefined ?
              (
                normalizeName(data.first_name)+" "+normalizeName(data.last_name)
              ) : (
                data.display_name
              )
            }
          </Typography>
          <Typography 
          className={classes.gridText} 
          style={{
            filter: data.data_truncated===undefined ? "none" : "blur(3px)"
          }}>
            {data.city+", "+data.country}
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
            <Typography style={{ filter: "blur(3px)" }}>
              +7 (000) 123 45 09
            </Typography>
            <Visibility className={classes.eye} />
          </Grid>

          <Divider className={classes.divider} />

          <Grid container direction="row" justify="space-between">
            <Email className={classes.leftIcon} />
            <Typography
              className={classes.typoMail}
              style={{ filter: "blur(3px)" }}
            >
              client@email.com
            </Typography>
            <Visibility className={classes.eye} />
          </Grid>

          <Divider className={classes.divider} />

          <Grid container direction="row" justify="space-between">
            <Telegram className={classes.leftIcon} />
            <Typography style={{ filter: "blur(3px)" }}>@nickname</Typography>
            <Visibility className={classes.eye} />
          </Grid>

          <Divider className={classes.divider} />

          <Grid container direction="row" justify="space-between">
            <Icon className={classes.leftIcon}>
              <Skype />
            </Icon>
            <Typography style={{ filter: "blur(3px)" }}>skype_login</Typography>
            <Visibility className={classes.eye} />
          </Grid>
        </Grid>
      </Box>

      <Button variant="outlined" className={classes.contactsBtn}>
        Показать контакты
      </Button>

      <Box>
        <Typography className={classes.gridTitle}>Профили</Typography>
        <Grid container direction="row" justify="flex-start" flexWrap="wrap">
          {
            data.data_truncated===undefined ? 
            Object.keys(data.linkmap).map(key => (
              data.linkmap[key].map(resource => (
                <Link href={resource}>
                  <Avatar
                    src={"https://wondersourcing.ru/assets/service_icons/" + key}
                    className={classes.resourceIcon}
                  />
                </Link>
              ))
            )) : data.has_links.map(elem => (
              <Avatar
                src={"https://wondersourcing.ru/assets/service_icons/" + elem}
                className={classes.resourceIcon}
              />
            ))
          }
        </Grid>
      </Box>
    </Box>
  );
};

export default User;
