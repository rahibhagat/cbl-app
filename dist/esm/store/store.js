import { createConsumer } from "./state";
import { useLog } from "./useLog";
var consumerArray = [];
function consumers(hooks) {
    consumerArray = hooks;
}
const composeHooks = (useLogger) => () => {
    const reduced = consumerArray.reduce((acc, hook) => (Object.assign(Object.assign({}, acc), hook())), {});
    Object.keys(reduced).filter(stateKey => {
        return stateKey.includes("State") && useLogger(stateKey, reduced[stateKey]);
    });
    return reduced;
};
const StoreContainer = createConsumer(composeHooks(useLog));
export { StoreContainer, consumers };
//# sourceMappingURL=store.js.map