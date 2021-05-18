import React from "react";

interface MathFactProps {
    number1: number;
    number2: number;
}

const MathFact: React.FC<MathFactProps> = ({ number1, number2 }) => {
    return (
        <li className="inline-block w-8 text-sm text-right border-b-2 border-gray-800 m-7">
            <div>{number1}</div>
            <div>x {number2}</div>
        </li>
    );
};

export default MathFact;
