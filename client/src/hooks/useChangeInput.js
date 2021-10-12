// Libraries
import { useState } from "react";

function useChangeInput(initialValue) {
    const [value, setValue] = useState(initialValue);
    const handleChange = e => {
        setValue(e.target.value)
    };

    const clear = () => {
        setValue('');
    }

    return [value, handleChange, clear];
}

export default useChangeInput;