import React, { useCallback, useEffect, useState } from "react";
import Input from "./components/input/input";
import MathFactList from "./components/math-fact-list/math-fact-list";
import MathFact from "./components/math-fact/math-fact";

type MathFact = { num1: number; num2: number };

const App: React.FC = () => {
    const [[min, max], setMinMax] = useState<[number, number]>([0, 12]);

    const [mathFacts, setMathFacts] = useState<Array<MathFact>>([]);

    const getNextRandomNumber = useCallback((min: number, max: number) => {
        return min + Math.round(Math.random() * (max - min));
    }, []);

    const generate = useCallback(() => {
        if (min == null || max == null) {
            setMathFacts([]);
            return;
        }

        const mathFacts: Array<MathFact> = [];
        for (let index = 0; index < 64; index++) {
            mathFacts.push({
                num1: getNextRandomNumber(min, max),
                num2: getNextRandomNumber(min, max),
            });
        }

        setMathFacts(mathFacts);
    }, [getNextRandomNumber, min, max]);

    useEffect(() => {
        generate();
    }, [generate]);

    const handleMinChange = useCallback((value: string) => {
        const newMin = parseInt(value);
        if (isNaN(newMin) || newMin < 0) {
            return;
        }

        setMinMax(([, max]) => [newMin, newMin < (max ?? 0) - 3 ? max : newMin + 3]);
    }, []);

    const handleMaxChange = useCallback((value: string) => {
        const newMax = parseInt(value);
        if (isNaN(newMax) || newMax > 12) {
            return;
        }

        setMinMax(([min]) => [(min ?? 0) + 3 < newMax ? min : newMax - 3, newMax]);
    }, []);

    return (
        <div>
            <h1 className="text-lg font-semibold text-center">Math Facts</h1>

            <div className="m-3 text-center">
                <Input
                    className="mr-4"
                    id="min"
                    label="Min"
                    onChange={handleMinChange}
                    type="number"
                    min={0}
                    max={9}
                    value={min}
                />

                <Input
                    className="mr-4"
                    id="max"
                    label="Max"
                    onChange={handleMaxChange}
                    type="number"
                    min={3}
                    max={12}
                    value={max}
                />

                <button
                    className="px-2 py-1 mx-2 text-white bg-blue-500 rounded-sm"
                    onClick={generate}>
                    Refresh
                </button>
            </div>

            <MathFactList>
                {mathFacts.map((mf, i) => {
                    return <MathFact key={i} number1={mf.num1} number2={mf.num2} />;
                })}
            </MathFactList>
        </div>
    );
};

export default App;
