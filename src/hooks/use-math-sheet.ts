import { useCallback, useReducer } from "react";

interface MathSheetHookOptions {
    totalCount?: number;
}

interface MathSheetHookResult {
    changeMaximum: (value?: string | null) => void;
    changeMinimum: (value?: string | null) => void;
    generate: () => void;
    min: number;
    max: number;
    mathFacts: Array<MathFact>;
}

type MathFact = { num1: number; num2: number };

interface MathSheetHookState {
    getRandomFacts: (min: number, max: number) => Array<MathFact>;
    min: number;
    max: number;
    mathFacts: Array<MathFact>;
}

type MathSheetHookAction =
    | { type: "minChange"; min: number }
    | { type: "maxChange"; max: number }
    | { type: "randomize" };

const buildRandomFactFunc = (count: number) => (min: number, max: number) => {
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

const defaultAppState = (totalCount: number): MathSheetHookState => {
    const getRandomFacts = buildRandomFactFunc(totalCount);

    return {
        getRandomFacts,
        min: 0,
        max: 12,
        mathFacts: getRandomFacts(0, 12),
    };
};

const calculateNextMinimum = (nextMax: number, currentMin: number) => {
    if (currentMin + 3 < nextMax) {
        return currentMin;
    }

    return nextMax - 3;
};

const calculateMaxValue = (nextMin: number, currentMax: number) => {
    if (nextMin < currentMax - 3) {
        return currentMax;
    }

    return nextMin + 3;
};

const appReducer = (
    state: MathSheetHookState,
    action: MathSheetHookAction,
): MathSheetHookState => {
    switch (action.type) {
        case "randomize": {
            const { min, max } = state;

            return {
                ...state,
                mathFacts: state.getRandomFacts(min, max),
            };
        }
        case "minChange": {
            const { min } = action;

            if (isNaN(min) || min < 0 || min > 9) {
                return state;
            }

            const max = calculateMaxValue(min, state.max);

            return {
                ...state,
                min,
                max,
                mathFacts: state.getRandomFacts(min, max),
            };
        }
        case "maxChange": {
            const { max } = action;

            if (isNaN(max) || max > 12 || max < 3) {
                return state;
            }

            const min = calculateNextMinimum(max, state.min);

            return {
                ...state,
                max,
                min,
                mathFacts: state.getRandomFacts(min, max),
            };
        }
    }
};

export default function useMathSheet(
    options?: MathSheetHookOptions,
): MathSheetHookResult {
    const { totalCount = 80 } = options ?? {};

    const [{ min, max, mathFacts }, dispatch] = useReducer(
        appReducer,
        defaultAppState(totalCount),
    );

    const generate = useCallback(() => {
        dispatch({ type: "randomize" });
    }, []);

    const changeMinimum = useCallback((value?: string | null) => {
        const min = value == null ? NaN : parseInt(value);
        dispatch({ type: "minChange", min });
    }, []);

    const changeMaximum = useCallback((value?: string | null) => {
        const max = value == null ? NaN : parseInt(value);
        dispatch({ type: "maxChange", max });
    }, []);

    return {
        changeMaximum,
        changeMinimum,
        generate,
        min,
        max,
        mathFacts,
    };
}
