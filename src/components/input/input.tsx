import React, { ChangeEvent, useRef } from "react";

interface InputProps {
    id: string;
    label: string;
    onChange: (value: string) => void;
    type?: string;
}

const Input: React.FC<InputProps> = ({ id, label, onChange, type = "text" }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
        onChange(evt.target.value);
    };

    return (
        <label htmlFor={id}>
            {label}
            <input
                className="p-1 mx-1 border-gray-300 rounded border-1"
                ref={inputRef}
                id={id}
                onChange={handleChange}
                type={type}
            />
        </label>
    );
};

export default Input;
