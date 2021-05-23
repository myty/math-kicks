import { useCallback, useReducer } from "react";

interface MathSheetHookOptions {
    totalCount?: number;
}

interface MathSheetHookResult {
    changeMaximum: (value: string) => void;
    changeMinimum: (value: string) => void;
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

            if (isNaN(min) || min < 0) {
                return state;
            }

            const max = min < (state.max ?? 0) - 3 ? state.max : min + 3;

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

            const min = (state.min ?? 0) + 3 < max ? state.min : max - 3;

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

    const changeMinimum = useCallback((value: string) => {
        const min = parseInt(value);
        dispatch({ type: "minChange", min });
    }, []);

    const changeMaximum = useCallback((value: string) => {
        const max = parseInt(value);
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
