/* eslint-disable jsx-a11y/no-onchange */

import React, { useRef } from "react";
import LabelWrapper from "../label-wrapper/label-wrapper";
import { v4 as uuidv4 } from "uuid";

interface SelectProps<
    TData extends any,
    TTextKey extends keyof TData,
    TValueKey extends keyof TData,
> {
    current?: TData;
    label?: string;
    onChange: (value: TData) => void;
    options: Array<TData>;
    textProp: TTextKey;
    valueProp: TValueKey;
}

export default function Select<
    TData extends any,
    TTextKey extends keyof TData,
    TValueKey extends keyof TData,
>({
    current,
    label,
    onChange,
    textProp,
    valueProp,
    options,
}: SelectProps<TData, TTextKey, TValueKey>): React.ReactElement<any, any> | null {
    const elementId = useRef<string>(uuidv4());

    const getPropValue = (option: TData, key: TValueKey | TTextKey): string => {
        const value = option[key];
        switch (typeof value) {
            case "string":
                return value;
            case "bigint":
            case "boolean":
            case "number":
                return value.toString();
        }

        return "N/A";
    };

    const handleOptionChange: React.ChangeEventHandler<HTMLSelectElement> = (evt) => {
        const value = options.find(
            (opt) => getPropValue(opt, valueProp) === evt.currentTarget.value,
        );

        if (value == null) {
            return;
        }

        onChange(value);
    };

    return (
        <LabelWrapper label={label} labelFor={elementId.current}>
            <select
                className="p-1 pr-8 mx-1 border-gray-300 rounded border-1"
                id={elementId.current}
                onChange={handleOptionChange}>
                {options.map((opt, i) => (
                    <option
                        key={i}
                        selected={current === opt}
                        value={getPropValue(opt, valueProp)}>
                        {getPropValue(opt, textProp)}
                    </option>
                ))}
            </select>
        </LabelWrapper>
    );
}
