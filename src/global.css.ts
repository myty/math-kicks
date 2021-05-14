import { globalStyle } from "@vanilla-extract/css";
import { vars } from "./vars.css";

globalStyle("body, body *", {
    all: "unset",
    boxSizing: "border-box",
});

globalStyle("body", {
    fontFamily: vars.fontFamily.body,
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
    textAlign: "left",
    color: "#2c3e50",
});

globalStyle("h1, h2, h3, h4, h5, h6", {
    fontFamily: vars.fontFamily.heading,
    fontWeight: 600,
    display: "block",
});

globalStyle("p", {
    display: "block",
});

globalStyle("h1", {
    fontSize: vars.fontSize["5x"],
    lineHeight: vars.lineHeight["5x"],
});

globalStyle("h2", {
    fontSize: vars.fontSize["4x"],
    lineHeight: vars.lineHeight["4x"],
});

globalStyle("h3", {
    fontSize: vars.fontSize["3x"],
    lineHeight: vars.lineHeight["3x"],
});

globalStyle("h4", {
    fontSize: vars.fontSize["2x"],
    lineHeight: vars.lineHeight["2x"],
});

globalStyle("h5", {
    fontSize: vars.fontSize["1x"],
    lineHeight: vars.lineHeight["1x"],
});

globalStyle("h6, p", {
    fontSize: vars.fontSize["0x"],
    lineHeight: vars.lineHeight["0x"],
});
