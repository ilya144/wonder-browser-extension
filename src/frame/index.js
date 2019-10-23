/* global chrome */
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Fab, Box } from "@material-ui/core";
import { ArrowLeft } from "@material-ui/icons";

import "./styles.css";

import Header from "./header";
import User from "./user";
import Footer from "./footer";
import Short from "./short";

const useStyles = makeStyles(theme => ({
  mainContainer: {
    backgroundColor: "#fff",
    padding: "0",
    height: "100vh",
    overflow: "hidden",

    maxWidth: "375px",
    boxShadow: "0 0 10px rgba(0, 0, 0.1, 0.5)"
  },
  closeBtn: {
    position: "absolute",
    right: "-28px",
    top: "55vh",
    backgroundColor: "#fff"
  }
}));

function App(props) {
  const classes = useStyles();
  const [isOpened, setOpen] = useState(true);
  const [open, close] = [() => setOpen(true), () => setOpen(false)];

  return (
    <Container
      className={classes.mainContainer}
      maxWidth="xs"
      style={{
        minHeight: isOpened ? "600px" : "300px",
        marginTop: isOpened ? "0" : "30vh"
      }}
    >
      {isOpened ? (
        <Box>
          <Header />
          <User data={props.data} />
          <Box style={{ minHeight: "300px" }}>
            <Fab
              aria-label="add"
              className={classes.closeBtn}
              onClick={() => close()}
            >
              <ArrowLeft />
            </Fab>
          </Box>
          <Footer />
        </Box>
      ) : (
        <Short open={open} data={props.data} />
      )}
    </Container>
  );
}

const app = document.createElement('div');
app.id = "WonderSourcing-frame";
document.body.appendChild(app);

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type !== "data") return;

  ReactDOM.render(<App data={msg.data}/>, document.getElementById("WonderSourcing-frame"));
});
