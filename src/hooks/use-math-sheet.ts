import { MathSymbol } from "enums/math-symbol";
import { useCallback, useReducer } from "react";
import { NumberGenerationUtils } from "utils/number-generation-utils";

interface MathSheetHookOptions {
    totalCount?: number;
}

interface MathSheetHookResult {
    changeMaximum: (value?: string | null) => void;
    changeMinimum: (value?: string | null) => void;
    changeSymbol: (value?: string | null) => void;
    generate: () => void;
    min: number;
    max: number;
    mathProblems: Array<MathProblem>;
    symbol: MathSymbol;
}

export type MathProblem = { num1: number; num2: number };

interface MathSheetHookState {
    generateMathProblems: (
        min: number,
        max: number,
        symbol: MathSymbol,
    ) => Array<MathProblem>;
    min: number;
    max: number;
    mathProblems: Array<MathProblem>;
    symbol: MathSymbol;
}

type MathSheetHookAction =
    | { type: "minChange"; min: number }
    | { type: "maxChange"; max: number }
    | { type: "symbolChange"; value: string | null | undefined }
    | { type: "randomize" };

const buildRandomFactFunc =
    (count: number) =>
    (min: number, max: number, symbol: MathSymbol = MathSymbol.Multiplication) => {
        return NumberGenerationUtils.generateMathProblems({
            symbol,
            count,
            min,
            max,
        });
    };

const defaultAppState = (totalCount: number): MathSheetHookState => {
    const generateMathProblems = buildRandomFactFunc(totalCount);

    const defaults = {
        min: 0,
        max: 12,
        symbol: MathSymbol.Multiplication,
    };

    return {
        ...defaults,
        generateMathProblems,
        mathProblems: generateMathProblems(0, 12),
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
            const { min, max, symbol } = state;

            return {
                ...state,
                mathProblems: state.generateMathProblems(min, max, symbol),
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
                mathProblems: state.generateMathProblems(min, max, state.symbol),
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
                mathProblems: state.generateMathProblems(min, max, state.symbol),
            };
        }
        case "symbolChange": {
            const { value } = action;

            if (!isMathSymbol(value)) {
                return state;
            }

            return {
                ...state,
                symbol: value,
                mathProblems: state.generateMathProblems(state.min, state.max, value),
            };
        }
    }
};

function isMathSymbol(value?: string | null): value is MathSymbol {
    return (
        value === MathSymbol.Addition ||
        value === MathSymbol.Subtraction ||
        value === MathSymbol.Multiplication
    );
}

export default function useMathSheet(
    options?: MathSheetHookOptions,
): MathSheetHookResult {
    const { totalCount = 80 } = options ?? {};

    const [{ min, max, mathProblems, symbol }, dispatch] = useReducer(
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

    const changeSymbol = useCallback((value?: string | null) => {
        dispatch({ type: "symbolChange", value });
    }, []);

    return {
        changeMaximum,
        changeMinimum,
        changeSymbol,
        generate,
        min,
        max,
        mathProblems,
        symbol,
    };
}
