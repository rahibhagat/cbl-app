import * as React from "react";
export function createConsumer(useHook) {
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
export function useConsumer(consumer) {
    return consumer.useConsumer();
}
//# sourceMappingURL=state.js.map