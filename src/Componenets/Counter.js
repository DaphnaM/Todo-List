import React, { useState } from "react";

function Counter({ initial = 0 }) {

    const [count, setCount] = useState(initial)

    function increment() {
        setCount(count + 1)
    }
    return <button onClick={increment}> {count} </button>
}

export default Counter