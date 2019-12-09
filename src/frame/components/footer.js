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
    width: "90%",     // after minimize
    padding: "8px 0", // padding: "15px 0", before minimize
    color: "#5c6c7d", //#65b4ef outline in maket
    backgroundColor: "#fff",

    position: "absolute",
    top: "-40px",     // top: "-35px", before minimize
    left: "5%",       // left: "3%", before minimize

    border: "1px #65b4ef solid",
    textTransform: "none"
  }
}));

const Footer = props => {
  const classes = useStyles();
  const allowPayBtn = false;

  return (
    <Box className={classes.footer}>
      { 
        props.data_truncated===undefined && props.data.empty===undefined ? (
          <Button
            variant="contained"
            href={props.url}
            target="_blank"
            className={classes.button}
          >
            Показать резюме на WonderSourcing
          </Button>
        ) : props.data_truncated && allowPayBtn ? (
          <Button
            variant="contained"
            href="https://wondersourcing.ru"
            target="_blank"
            className={classes.button}
          >
            Перейти к оплате
          </Button>
        ) : null
      }
    </Box>
  );
};

export default Footer;
