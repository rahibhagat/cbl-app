import { createConsumer } from "./state";
import { useLog } from "./useLog";

var consumerArray: any[] = []
function consumers(hooks: any){
  consumerArray = hooks
}
const composeHooks = (useLogger: { (name: any, state: any): void; (arg0: string, arg1: any): any; }) => () => {
   const reduced = consumerArray.reduce((acc, hook) => ({ ...acc, ...hook() }), {});
  Object.keys(reduced).filter(stateKey => {
    return stateKey.includes("State") && useLogger(stateKey, reduced[stateKey]);
  });
  return reduced;
};

const StoreContainer =  createConsumer(composeHooks(useLog));

export { StoreContainer,consumers };
