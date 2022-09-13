import React, { useState } from 'react';
const MyCounter = ({ value = 0 }) => {
    const [counter, setCounter] = useState(value);
    const onMinus = () => {
        setCounter((prev) => prev - 1);
    };
    const onPlus = () => {
        setCounter((prev) => prev + 1);
    };
    return (React.createElement("div", null,
        React.createElement("h1", null,
            "Counter: ",
            counter),
        React.createElement("button", { onClick: onMinus }, "-"),
        React.createElement("button", { onClick: onPlus }, "+")));
};
export default MyCounter;
//# sourceMappingURL=App.js.map