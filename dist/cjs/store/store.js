"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consumers = exports.StoreContainer = void 0;
const state_1 = require("./state");
const useLog_1 = require("./useLog");
var consumerArray = [];
function consumers(hooks) {
    consumerArray = hooks;
}
exports.consumers = consumers;
const composeHooks = (useLogger) => () => {
    const reduced = consumerArray.reduce((acc, hook) => (Object.assign(Object.assign({}, acc), hook())), {});
    Object.keys(reduced).filter(stateKey => {
        return stateKey.includes("State") && useLogger(stateKey, reduced[stateKey]);
    });
    return reduced;
};
const StoreContainer = (0, state_1.createConsumer)(composeHooks(useLog_1.useLog));
exports.StoreContainer = StoreContainer;
//# sourceMappingURL=store.js.map