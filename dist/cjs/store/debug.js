"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogEntries = void 0;
const utility_1 = require("./utility");
const useConsole_1 = require("./useConsole");
const LogEntries = (name, state, prevState, object) => {
    const { createGroup, endGroup, logMsg } = (0, useConsole_1.useConsole)();
    const timestamp = (0, utility_1.getTimeStamp)();
    const { added, updated, deleted } = object;
    createGroup(`${name} ${timestamp}`);
    if (!(0, utility_1.isEmpty)(added)) {
        logMsg('Added\n ', added);
    }
    if (!(0, utility_1.isEmpty)(updated)) {
        logMsg('Updated\n ', updated);
    }
    if (!(0, utility_1.isEmpty)(deleted)) {
        logMsg('Deleted\n ', deleted);
    }
    if (added || updated || deleted) {
        logMsg('New state\n ', state);
        logMsg('Old state\n ', prevState);
    }
    endGroup();
};
exports.LogEntries = LogEntries;
//# sourceMappingURL=debug.js.map