import useInputController, { InputProps } from "components/input/use-input-controller";
import React from "react";

const Input: React.FC<InputProps> = (props) => {
    const { additionalProps, changeInputValue, className, id, label, type, value } =
        useInputController({
            props,
        });

    return (
        <label className={className} htmlFor={id}>
            {label}
            <input
                className="p-1 mx-1 border-gray-300 rounded border-1"
                id={id}
                onChange={changeInputValue}
                type={type}
                value={value}
                {...additionalProps}
            />
        </label>
    );
};

export default Input;
