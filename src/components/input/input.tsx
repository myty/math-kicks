import React, { ChangeEvent, useRef } from "react";
import inputStyles from "./input.css";

interface InputProps {
    id: string;
    label: string;
    onChange: (value: string) => void;
}

const Input: React.FC<InputProps> = ({ id, label, onChange }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
        onChange(evt.target.value);
    };

    return (
        <label htmlFor={id} className={inputStyles.label}>
            {label}
            <input
                className={inputStyles.input}
                ref={inputRef}
                id={id}
                onChange={handleChange}
            />
        </label>
    );
};

export default Input;
