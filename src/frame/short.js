import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Icon, Fab, Grid, Avatar, Typography, Link } from "@material-ui/core";
import { ArrowRight } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  some: {
    margin: theme.spacing(1)
  },
  favicon: {
    margin: "0 auto",
    marginBottom: "10px",
    width: "40px",
    height: "40px",

    backgroundColor: "#fff"
  },
  resourceIcon: {
    width: "25px",
    height: "25px",
    margin: "8px",
    "&:hover, &:focus": {
      cursor: "pointer"
    }
  }
}));

const Short = ({ data, ...props }) => {
  const classes = useStyles();

  return (
    <Box display="flex" flexDirection="column">
      <Box
        display="flex"
        flexDirection="column"
        style={{ backgroundColor: "#eeeff0", padding: "8px" }}
      >
        <Avatar
          src="https://wondersourcing.ru//assets/ws-logo-bw.png"
          className={classes.favicon}
        />
        <Fab className={classes.favicon} onClick={() => props.open()}>
          <ArrowRight />
        </Fab>
        <Typography
          style={{ color: "#909191", fontWeight: "bold", fontSize: "10px" }}
        >
          Развернуть
        </Typography>
      </Box>
      {data.empty ? null :
      <Grid container alignItems="center" direction="column">
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
      </Grid>}
    </Box>
  );
};

export default Short;
