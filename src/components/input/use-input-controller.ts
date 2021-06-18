import { ChangeEvent, useCallback, useEffect, useState } from "react";

type InputType =
    | { type: "number"; min: number; max: number; value: number }
    | { type: "text"; value?: string };

export type InputProps = InputType & {
    className?: string;
    id: string;
    label?: string;
    onChange: (value: string) => void;
};

interface InputControllerOptions {
    props: InputProps;
}

interface InputControllerHook {
    changeInputValue: (evt: ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    id: string;
    label?: string;
    additionalProps?: { max?: number; min?: number };
    type: "number" | "text";
    value?: string | number;
}

export default function useInputController(
    options: InputControllerOptions,
): InputControllerHook {
    const {
        className,
        id,
        label,
        onChange,
        type,
        value: propValue,
        ...additionalProps
    } = options.props;

    const [value, setValue] = useState(propValue);

    useEffect(() => {
        setValue((prev) => {
            if (prev === propValue) {
                return prev;
            }

            return propValue;
        });
    }, [propValue]);

    const changeInputValue = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
        onChange(evt.target.value);
    }, []);

    return {
        additionalProps,
        changeInputValue,
        className,
        id,
        label,
        type,
        value,
    };
}
