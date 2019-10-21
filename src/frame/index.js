import React from "react";
import ReactDOM from "react-dom";
import { Container } from "@material-ui/core";

import "./styles.css";

import Header from "./header";
import User from "./user";

function App() {
  return (
    <Container className="App" maxWidth="xs">
      <Header />
      <User />
    </Container>
  );
}

// const rootElement = document.getElementById("root");
const rootElement = document.querySelector("iframe.wondersourcing-frame").contentDocument.getElementById("root")
console.log("going to render");
ReactDOM.render(<App />, rootElement);
