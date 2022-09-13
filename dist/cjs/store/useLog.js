"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLog = void 0;
const react_1 = require("react");
const utility_1 = require("./utility");
const debug_1 = require("./debug");
function useLog(name, state) {
    const debugOn = process.env.NODE_ENV === "development";
    const Comparison = (obj1, obj2) => {
        return JSON.stringify(obj1) !== JSON.stringify(obj2);
    };
    const prevState = (0, react_1.useRef)(state);
    (0, react_1.useEffect)(() => {
        if (debugOn && Comparison(state, prevState.current)) {
            const deepComparison = (0, utility_1.detailedDiff)(prevState.current, state);
            (0, debug_1.LogEntries)(name, state, prevState.current, deepComparison);
        }
        return () => {
            prevState.current = state;
        };
    }, [name, state, prevState, debugOn]);
}
exports.useLog = useLog;
//# sourceMappingURL=useLog.js.map