import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  footer: {
    backgroundColor: "#7f8fa4",
    position: "absolute",
    width: "100%",
    height: "28px",
    bottom: "0px"
  },
  button: {
    margin: "auto",
    padding: "15px 0",
    color: "#5c6c7d", //#65b4ef outline in maket
    backgroundColor: "#fff",

    position: "absolute",
    top: "-35px",
    left: "3%",
    right: "3%",

    border: "1px #65b4ef solid",
    textTransform: "none"
  }
}));

const Footer = props => {
  const classes = useStyles();

  return (
    <Box className={classes.footer}>
      { props.data_truncated===undefined && props.data.empty===undefined ? (
      <Button
        variant="contained"
        href={props.url}
        target="_blank"
        className={classes.button}
      >
        Показать резюме на WonderSourcing
      </Button>
      ) : props.data_truncated ?
      <Button
        variant="contained"
        href="https://wondersourcing.ru"
        target="_blank"
        className={classes.button}
      >
        Перейти к оплате
      </Button>
       : null }
    </Box>
  );
};

export default Footer;
