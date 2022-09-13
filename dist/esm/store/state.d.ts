import * as React from "react";
export declare type ConsumerProviderProps<State = void> = {
    initialState?: State;
    children: React.ReactNode;
};
export interface Consumer<Value, State = void> {
    Provider: React.ComponentType<ConsumerProviderProps<State>>;
    useConsumer: () => Value;
}
export declare function createConsumer<Value, State = void>(useHook: (initialState?: State) => Value): Consumer<Value, State>;
export declare function useConsumer<Value, State = void>(consumer: Consumer<Value, State>): Value;
