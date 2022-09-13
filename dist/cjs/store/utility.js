"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detailedDiff = exports.getTimeStamp = exports.isEmpty = void 0;
const deep_object_diff_1 = require("deep-object-diff");
Object.defineProperty(exports, "detailedDiff", { enumerable: true, get: function () { return deep_object_diff_1.detailedDiff; } });
function padLeft(str, length, padding) {
    let strReturn = str;
    for (let i = 0, l = length - String(strReturn).length; i < l; i += 1) {
        strReturn = `${padding}${str}`;
    }
    return strReturn;
}
function isEmpty(obj) {
    if (typeof obj !== 'undefined') {
        return Object.entries(obj).length === 0;
    }
    return false;
}
exports.isEmpty = isEmpty;
function getTimeStamp() {
    const date = new Date();
    const timestamp = `[${padLeft(date.getHours(), 2, 0)}:${padLeft(date.getMinutes(), 2, 0)}:${padLeft(date.getSeconds(), 2, 0)}.${padLeft(date.getMilliseconds(), 3, 0)}]`;
    return timestamp;
}
exports.getTimeStamp = getTimeStamp;
//# sourceMappingURL=utility.js.map