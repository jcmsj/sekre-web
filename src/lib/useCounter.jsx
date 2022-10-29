import { useState } from "react";

export function useCounter(initialState) {
    const [count, setCount] = useState(initialState);
    const increment = (n = 1) => setCount(count + n);
    const decrement = (n = 1) => setCount(count - n);
    return {
        count,
        decrement,
        increment,
        setCount
    };
}
