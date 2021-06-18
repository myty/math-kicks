import React, { Fragment } from "react";

interface LabelWrapperProps {
    label?: string;
    labelClassName?: string;
    labelFor?: string;
}

const LabelWrapper: React.FC<LabelWrapperProps> = (props) => {
    const { children, label, labelClassName, labelFor } = props;

    if (label == null) {
        return <Fragment>{children}</Fragment>;
    }

    return (
        <label className={labelClassName} htmlFor={labelFor}>
            {label}
            {children}
        </label>
    );
};

export default LabelWrapper;
