/* global chrome */
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { create } from 'jss';
import isolate from 'jss-plugin-isolate'
import { jssPreset } from "@material-ui/styles";

import App from "./App";


const iFrame = document.createElement("iframe");

iFrame.scrolling = "no";
const frame_styles = {
    border: "none",
    position: "fixed",
    zIndex: 7777,
    top: "0",
    left: "0",
    width: "0",
    height: "0"
}
for (let key in frame_styles) {
	iFrame.style[key] = frame_styles[key];
}
document.body.appendChild(iFrame);

const iDoc = iFrame.contentWindow.document;

iDoc.body.style.margin = "0";
iDoc.body.style.padding = "0";

const root = iDoc.createElement("div");

root.id = "root";
root.style.position = "absolute";

iDoc.body.appendChild(root);

const setSize = (width, height) => {
  iFrame.style.width = width;
  iFrame.style.height = height;
}
const setTop = top => {iFrame.style.top = top}

const jss = create({
    ...jssPreset(),
    insertionPoint: root
});
jss.use(
    isolate({
        isolate: true
    })
);


chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type !== "data") return;

    ReactDOM.render(
        <App
            data={msg.data}
            setSize={setSize}
            setTop={setTop}
            jss={jss}
        />,
    root);
});
