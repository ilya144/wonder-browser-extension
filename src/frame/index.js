/* global chrome */
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { create } from 'jss';
import isolate from 'jss-plugin-isolate'
import { makeStyles } from "@material-ui/core/styles";
import { StylesProvider, jssPreset } from "@material-ui/styles";
import { Container, Fab, Box } from "@material-ui/core";
import { ArrowLeft } from "@material-ui/icons";

import "./styles.css";

import Header from "./header";
import User from "./user";
import Footer from "./footer";
import Short from "./short";
import NotFound from "./notFound";

const useStyles = makeStyles(theme => ({
  mainContainer: {
    backgroundColor: "#fff",
    padding: "0",
    // height: "100vh",
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
  const [isOpened, setOpen] = useState( props.data.empty ? false : true );
  const [open, close] = [() => setOpen(true), () => setOpen(false)];
  
  return (
    <StylesProvider jss={jss}>
    <Container
      className={classes.mainContainer}
      maxWidth="xs"
      style={{
        minHeight: isOpened ? "600px" : "",
        marginTop: isOpened ? "0" : "30vh",

        backgroundColor: "#fff",
        padding: "0",
        height: isOpened ? "100vh" : props.data.empty ? "" : "100vh",
        overflow: "hidden",

        maxWidth: "375px",
        boxShadow: "0 0 10px rgba(0, 0, 0.1, 0.5)"
      }}
    >
      {isOpened ? (
        <Box>
          <Header />
          {props.data.empty ? <NotFound data={props.data} /> : <User data={props.data} />}
          <Box style={{ minHeight: "300px" }}>
            <Fab
              aria-label="add"
              className={classes.closeBtn}
              onClick={close}
              style={{
                position: "absolute",
                right: "-28px",
                top: "55vh",
                backgroundColor: "#fff"
              }}
            >
              <ArrowLeft />
            </Fab>
          </Box>
          <Footer 
            data_truncated={props.data.data_truncated}
            url={props.data.url}
            data={props.data}
          />
        </Box>
      ) : (
        <Short open={open} data={props.data} />
      )}
    </Container>
    </StylesProvider>
  );
}

const frame = document.createElement("div");
frame.id = "WonderSourcing-frame";
const iFrame = document.createElement("iframe");
iFrame.scrolling = "no";
document.body.appendChild(frame);

frame.appendChild(iFrame);
const iDoc = iFrame.contentWindow.document;

iDoc.body.style.margin = "0";
iDoc.body.style.padding = "0";

const root = iDoc.createElement("div");

root.id = "root";
root.style.position = "absolute";

iDoc.body.appendChild(root);
// frame.style.width = "375px";
// frame.style.height = "100vh";
// frame.style.border = "";

// const shadow = frame.attachShadow({mode: "open"});
// const root = document.createElement("div");
// root.id = "root";
// shadow.appendChild(root);

const jss = create({
  ...jssPreset(),
  // Define a custom insertion point that JSS will look for when injecting the styles into the DOM.
  // insertionPoint: document.getElementById('jss-insertion-point'),
  // insertionPoint: document.head,
  insertionPoint: root
});
jss.use(
  isolate({
      isolate: true
  })
);


// const app = document.createElement('div');
// app.id = "WonderSourcing-frame";
// document.body.appendChild(app);



chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type !== "data") return;

  // ReactDOM.render(<App data={msg.data}/>, document.getElementById("WonderSourcing-frame"));
  ReactDOM.render(<App data={msg.data}/>, root);
});
