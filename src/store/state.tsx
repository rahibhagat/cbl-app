import * as React from "react"

export type ConsumerProviderProps<State = void> = {
	initialState?: State
	children: React.ReactNode
}

export interface Consumer<Value, State = void> {
	Provider: React.ComponentType<ConsumerProviderProps<State>>
	useConsumer: () => Value
}

export function createConsumer<Value, State = void>(
	useHook: (initialState?: State) => Value,
): Consumer<Value, State> {
	let Context = React.createContext<Value | null>(null)

	function Provider(props: ConsumerProviderProps<State>) {
		let value = useHook(props.initialState)
		return <Context.Provider value={value}>{props.children}</Context.Provider>
	}

	function useConsumer(): Value {
		let value = React.useContext(Context)
		if (value === null) {
			throw new Error("Component must be wrapped with <Consumer.Provider>")
		}
		return value
	}

	return { Provider, useConsumer }
}

export function useConsumer<Value, State = void>(
	consumer: Consumer<Value, State>,
): Value {
	return consumer.useConsumer()
}
