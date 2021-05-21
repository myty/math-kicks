import React, { useCallback, useReducer } from "react";
import Input from "./components/input/input";
import MathFactList from "./components/math-fact-list/math-fact-list";
import MathFact from "./components/math-fact/math-fact";

type MathFact = { num1: number; num2: number };

interface AppState {
    min: number;
    max: number;
    mathFacts: Array<MathFact>;
}

type AppAction =
    | { type: "minChange"; min: number }
    | { type: "maxChange"; max: number }
    | { type: "randomize" };

const getRandomFacts = (min: number, max: number, count: number) => {
    const mathFacts: Array<MathFact> = [];
    const getNextRandomNumber = () => min + Math.round(Math.random() * (max - min));

    for (let index = 0; index < count; index++) {
        mathFacts.push({
            num1: getNextRandomNumber(),
            num2: getNextRandomNumber(),
        });
    }

    return mathFacts;
};

const defaultAppState: AppState = {
    min: 0,
    max: 12,
    mathFacts: getRandomFacts(0, 12, 80),
};

const appReducer = (state: AppState, action: AppAction): AppState => {
    switch (action.type) {
        case "randomize": {
            const { min, max } = state;

            return {
                ...state,
                mathFacts: getRandomFacts(min, max, 80),
            };
        }
        case "minChange": {
            const { min } = action;

            if (isNaN(min) || min < 0) {
                return state;
            }

            const max = min < (state.max ?? 0) - 3 ? state.max : min + 3;

            return {
                ...state,
                min,
                max,
                mathFacts: getRandomFacts(min, max, 80),
            };
        }
        case "maxChange": {
            const { max } = action;

            if (isNaN(max) || max > 12 || max < 3) {
                return state;
            }

            const min = (state.min ?? 0) + 3 < max ? state.min : max - 3;

            return {
                ...state,
                max,
                min,
                mathFacts: getRandomFacts(min, max, 80),
            };
        }
    }
};

const App: React.FC = () => {
    const [{ min, max, mathFacts }, dispatch] = useReducer(appReducer, defaultAppState);

    const generate = useCallback(() => {
        dispatch({ type: "randomize" });
    }, []);

    const handleMinChange = useCallback((value: string) => {
        const min = parseInt(value);
        dispatch({ type: "minChange", min });
    }, []);

    const handleMaxChange = useCallback((value: string) => {
        const max = parseInt(value);
        dispatch({ type: "maxChange", max });
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
                {mathFacts.map((mf, i) => (
                    <MathFact key={i} number1={mf.num1} number2={mf.num2} />
                ))}
            </MathFactList>
        </div>
    );
};

export default App;
