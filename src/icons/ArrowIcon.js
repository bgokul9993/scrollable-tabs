import React from 'react';

export const ArrowIcon = ({ isOpen, isRight, isLeft, disabled }) => (
    <svg
        width="16"
        height="16"
        viewBox="0 0 1792 1792"
        xmlns="http://www.w3.org/2000/svg"
        transform={isOpen ? "rotate(180)" : null}
        style={{ fill: (disabled ? "#dadfe3" : "#414655"), transform: (isLeft ? "rotate(90deg)" : isRight ? "rotate(-90deg)" : null) }}
    >
        <path d="M1408 704q0 26-19 45l-448 448q-19 19-45 19t-45-19l-448-448q-19-19-19-45t19-45 45-19h896q26 0 45 19t19 45z" />
    </svg>
);
