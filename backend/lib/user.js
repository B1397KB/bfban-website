"use strict";
import xss from "xss";
import express from "express";
import config from "../config.js";
import { userHasRoles } from "./auth.js";

/** @param {string} content */
function handleRichTextInput(content) {
    return xss(content);
}

/** @param {string[]} current @param {string} add */
function privilegeGranter(current, add) {
    if(add=='blacklisted') // blacklisted, remove all what he got before
        return ['blacklisted'];
    const tmp = new Set(current);
    if( (tmp.has('blacklisted') || tmp.has('freezed')) && add!='freezed' ) { // unban
        tmp.delete('blacklisted');
        tmp.delete('freezed');
    }
    tmp.add(add); // for freezed and other permission
    if(['dev','admin','super','root'].includes(add))
        tmp.delete('normal');
    return Array.from(tmp);
}

/** @param {string[]} current @param {string} del */
function privilegeRevoker(current, del) {
    const tmp = new Set(current);
    tmp.delete(del);
    if(tmp.size == 0)
        tmp.add('normal');
    return Array.from(tmp);
}

function cheatMethodsSanitizer(val, {req}) {
    const cheatMethods = new Set();
    for(let i of val.split(','))
        if(config.possiblecheatMethods.includes(i))
            cheatMethods.add(i); // validate & remove duplicated
    if(cheatMethods.size == 0)
        throw new Error("No valid cheate method given.");
    req.body.data.cheatMethods = Array.from(cheatMethods).join(',');
    return true;
}

const userAttributes = {
    "language": {type: "string", get: true, set: true, isprivate: true, default: 'en-us'},
    "showOrigin": {type: "boolean", get: true, set: true, default: false},
    "allowDM": {type: "boolean", get: true, set: true, default: false},
    "certUser": {type: "string", get: true, set: false, default: ''},
    "freezeOfNoBinding": {type: "boolen", get: true, set: false, default: false},
    "changeNameLeft": {type: "number", get: true, set: false, isprivate: true, default: 3},
    "registerIP": {type: "string", get: false, set: false, default: ''},
    "lastSigninIP": {type: "string", get:false, set: false, default: ''},
}

function userShowAttributes(attr, showprivate=false, force=false) {
    const result = {};
    for(let i of Object.keys(userAttributes))
        if(( userAttributes[i].get && showprivate|(!userAttributes[i].isprivate) )|| force)
            result[i] = attr[i];
    return result;
}

function userSetAttributes(org, attr, force=false) {
    const result = org;
    for(let i of Object.keys(userAttributes))
        if(typeof(attr[i])==userAttributes[i].type && (userAttributes[i].set || force))
            result[i] = attr[i];
    return result;
}

function userDefaultAttribute(registerIP='', language='en-us') {
    const result = {};
    for(let i of Object.keys(userAttributes))
        result[i] = userAttributes[i].default;
    result.registerIP = registerIP;
    result.language = language;
    return result;
}

export {
    handleRichTextInput,
    privilegeGranter,
    privilegeRevoker,
    cheatMethodsSanitizer,
    userAttributes,
    userSetAttributes,
    userShowAttributes,
    userDefaultAttribute,
}