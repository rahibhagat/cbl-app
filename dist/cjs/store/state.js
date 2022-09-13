"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useConsumer = exports.createConsumer = void 0;
const React = __importStar(require("react"));
function createConsumer(useHook) {
    let Context = React.createContext(null);
    function Provider(props) {
        let value = useHook(props.initialState);
        return React.createElement(Context.Provider, { value: value }, props.children);
    }
    function useConsumer() {
        let value = React.useContext(Context);
        if (value === null) {
            throw new Error("Component must be wrapped with <Consumer.Provider>");
        }
        return value;
    }
    return { Provider, useConsumer };
}
exports.createConsumer = createConsumer;
function useConsumer(consumer) {
    return consumer.useConsumer();
}
exports.useConsumer = useConsumer;
//# sourceMappingURL=state.js.map