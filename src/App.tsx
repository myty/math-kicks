/* eslint-disable jsx-a11y/no-onchange */
import useMathSheet from "hooks/use-math-sheet";
import React, { useState } from "react";
import Input from "components/input/input";
import MathProblemList from "components/math-probelm-list/math-problem-list";
import MathProblem from "components/math-problem/math-problem";
import { MathSymbol } from "enums/math-symbol";

const App: React.FC = () => {
    const {
        changeMaximum,
        changeMinimum,
        changeSymbol,
        generate,
        min,
        max,
        symbol,
        mathProblems,
    } = useMathSheet({
        totalCount: 80,
    });

    const [showAnswers, setShowAnswers] = useState(false);

    const handleSymbolChange: React.ChangeEventHandler<HTMLSelectElement> = (evt) => {
        changeSymbol(evt.currentTarget.value);
    };

    const handleShowAnswers: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
        setShowAnswers(evt.currentTarget.checked);
    };

    return (
        <div>
            <h1 className="text-lg font-semibold text-center">Math Facts</h1>

            <div className="m-3 text-center">
                <label>
                    Symbol
                    <select
                        onChange={handleSymbolChange}
                        className="p-1 pr-8 mx-1 border-gray-300 rounded border-1">
                        <option
                            selected={symbol === MathSymbol.Addition}
                            value={MathSymbol.Addition}>
                            Addition
                        </option>
                        <option
                            selected={symbol === MathSymbol.Subtraction}
                            value={MathSymbol.Subtraction}>
                            Subtraction
                        </option>
                        <option
                            selected={symbol === MathSymbol.Multiplication}
                            value={MathSymbol.Multiplication}>
                            Multiplication
                        </option>
                    </select>
                </label>

                <Input
                    className="mr-4"
                    id="min"
                    label="Min"
                    onChange={changeMinimum}
                    type="number"
                    min={0}
                    max={9}
                    value={min}
                />

                <Input
                    className="mr-4"
                    id="max"
                    label="Max"
                    onChange={changeMaximum}
                    type="number"
                    min={3}
                    max={12}
                    value={max}
                />

                <label>
                    <span>Show Answers:</span>
                    <input
                        type="checkbox"
                        checked={showAnswers}
                        onChange={handleShowAnswers}
                    />
                </label>

                <button
                    className="px-2 py-1 mx-2 text-white bg-blue-500 rounded-sm"
                    onClick={generate}>
                    Refresh
                </button>
            </div>

            <MathProblemList>
                {mathProblems.map((mf, i) => (
                    <MathProblem
                        key={i}
                        number1={mf.num1}
                        number2={mf.num2}
                        showAnswer={showAnswers}
                        symbol={symbol}
                    />
                ))}
            </MathProblemList>
        </div>
    );
};

export default App;
