// Libraries
import { useState } from "react";

// https://linguinecode.com/post/focus-next-input-in-react
// got help this article show in the link above.

function useChangeToken(initialValue) {
    const [value, setValue] = useState(initialValue);

    const handleChange = e => {
        const { maxLength, value } = e.target;
        const slot= parseInt(e.target.dataset.slot);
        if (value.length >= maxLength) {
            if (slot < 6) {
                const nextSibling = document.querySelector(
                    `input[name=token-${slot + 1}]`
                );
                if (nextSibling !== null) {
                    nextSibling.focus();
                }
            }
        }

        setValue(e.target.value);
    };

    const clear = () => {
        setValue('');
    }

    return [value, handleChange, clear];
}

export default useChangeToken;