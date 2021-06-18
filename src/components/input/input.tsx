import useInputController, { InputProps } from "components/input/use-input-controller";
import React, { useRef } from "react";
import LabelWrapper from "../label-wrapper/label-wrapper";
import { v4 as uuidv4 } from "uuid";

const Input: React.FC<InputProps> = (props) => {
    const elementId = useRef<string>(uuidv4());
    const { additionalProps, changeInputValue, className, label, type, value } =
        useInputController({
            props,
        });

    return (
        <LabelWrapper
            labelClassName={className}
            labelFor={elementId.current}
            label={label}>
            <input
                className="p-1 mx-1 border-gray-300 rounded border-1"
                id={elementId.current}
                onChange={changeInputValue}
                type={type}
                value={value}
                {...additionalProps}
            />
        </LabelWrapper>
    );
};

export default Input;
