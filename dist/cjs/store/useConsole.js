"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useConsole = void 0;
function useConsole() {
    const createGroup = console.group.bind(console);
    const endGroup = console.groupEnd.bind(console);
    const logMsg = console.log;
    return {
        createGroup,
        endGroup,
        logMsg
    };
}
exports.useConsole = useConsole;
//# sourceMappingURL=useConsole.js.map