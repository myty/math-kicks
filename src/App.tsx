import React, { useCallback, useEffect, useState } from "react";
import Input from "./components/input/input";

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
        for (let index = 0; index < 100; index++) {
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
                    id="min"
                    label="Min"
                    onChange={handleMinChange}
                    type="number"
                    min={0}
                    max={9}
                    value={min}
                />

                <Input
                    id="max"
                    label="Max"
                    onChange={handleMaxChange}
                    type="number"
                    min={3}
                    max={12}
                    value={max}
                />
                <button onClick={generate}>Refresh</button>
            </div>

            <ul className="flex flex-wrap">
                {mathFacts.map((mf, i) => {
                    return (
                        <li
                            key={i}
                            className="inline-block w-8 m-12 text-right border-b-2 border-gray-800">
                            <div>{mf.num1}</div>
                            <div>x {mf.num2}</div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default App;
