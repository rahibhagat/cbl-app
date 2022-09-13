import { useRef, useEffect } from "react";
import { detailedDiff } from "./utility";
import { LogEntries } from "./debug";
export function useLog(name, state) {
    const debugOn = process.env.NODE_ENV === "development";
    const Comparison = (obj1, obj2) => {
        return JSON.stringify(obj1) !== JSON.stringify(obj2);
    };
    const prevState = useRef(state);
    useEffect(() => {
        if (debugOn && Comparison(state, prevState.current)) {
            const deepComparison = detailedDiff(prevState.current, state);
            LogEntries(name, state, prevState.current, deepComparison);
        }
        return () => {
            prevState.current = state;
        };
    }, [name, state, prevState, debugOn]);
}
//# sourceMappingURL=useLog.js.map