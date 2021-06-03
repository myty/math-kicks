import { MathSymbol } from "enums/math-symbol";
import React from "react";
import { NumberCalculationUtils } from "utils/number-calculation-utils";

interface MathFactProps {
    number1: number;
    number2: number;
    showAnswer: boolean;
    symbol: MathSymbol;
}

const MathFact: React.FC<MathFactProps> = ({ number1, number2, showAnswer, symbol }) => {
    return (
        <li className="inline-block w-8 text-sm text-right m-7">
            <div>{number1}</div>
            <div className="border-b-2 border-gray-800">
                {symbol} {number2}
            </div>
            <div>
                {showAnswer
                    ? NumberCalculationUtils.calculateMathProblem({
                          symbol,
                          bottom: number1,
                          top: number2,
                      })
                    : ""}
            </div>
        </li>
    );
};

export default MathFact;
