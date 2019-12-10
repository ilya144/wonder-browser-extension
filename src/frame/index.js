/* global chrome */
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { create } from 'jss';
import isolate from 'jss-plugin-isolate'
import { jssPreset } from "@material-ui/styles";

import App from "./App";

/**
 * Создание блока iframe и внедрение его на страницу
 */
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


/**
 * Функция измениния длины и высоты фрейма
 * @param {number} width 
 * @param {number} height 
 */
const setSize = (width, height) => {
  iFrame.style.width = width;
  iFrame.style.height = height;
}

/**
 * Функция изменения отступа фрейма от верхнего края
 * @param {number} top
 */
const setTop = top => {iFrame.style.top = top}


/**
 * Создание объекта jss для внедрения стилей в тело фрейма
 */
const jss = create({
    ...jssPreset(),
    insertionPoint: root
});
jss.use(
    isolate({
        isolate: true
    })
);

/**
 * Обработчик сообщений от background.js на отоброжение контента фрейма
 */
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
