import React, { ChangeEvent, useEffect, useRef, useState } from "react";

type InputType =
    | { type: "number"; min: number; max: number; value: number }
    | { type: "text"; value?: string };

type InputProps = {
    id: string;
    label: string;
    onChange: (value: string) => void;
};

const Input: React.FC<InputType & InputProps> = ({
    id,
    label,
    onChange,
    type,
    value: propValue,
    ...rest
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [value, setValue] = useState(propValue);

    useEffect(() => {
        setValue((prev) => {
            if (prev === propValue) {
                return prev;
            }

            return propValue;
        });
    }, [propValue]);

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
                value={value}
                {...rest}
            />
        </label>
    );
};

export default Input;
