import "./App.css";

import React, { useCallback, useEffect, useState } from "react";
import { atoms } from "./atoms.css";
import Input from "./components/input/input";

type MathFact = { num1: number; num2: number };

const App: React.FC = () => {
    const [[min, max], setMinMax] = useState<[number | undefined, number | undefined]>([
        undefined,
        undefined,
    ]);

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

        setMinMax(([min, max]) => [newMin < (max ?? 12) ? newMin : min, max]);
    }, []);

    const handleMaxChange = useCallback((value: string) => {
        const newMax = parseInt(value);
        if (isNaN(newMax) || newMax > 12) {
            return;
        }

        setMinMax(([min, max]) => [min, (min ?? 0) < newMax ? newMax : max]);
    }, []);

    return (
        <div className={atoms({ padding: "1x" })}>
            <h1>Math Facts</h1>

            <Input id="min" label="Min" onChange={handleMinChange} />
            <Input id="max" label="Max" onChange={handleMaxChange} />

            <button onClick={generate}>Refresh</button>
            <ul className={atoms({ display: "flex" })}>
                {mathFacts.map((mf, i) => {
                    return (
                        <li key={i} className={atoms({ flexDirection: "row" })}>
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
