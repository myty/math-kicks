import { MathSymbol } from "enums/math-symbol";

type MathProblemCalculator = (numTop: number, numBottom: number) => number;

const calculateAdditionNumbers: MathProblemCalculator = (numTop, numBottom) => {
    return numTop + numBottom;
};

const calculateSubtractionNumbers: MathProblemCalculator = (numTop, numBottom) => {
    return numTop - numBottom;
};

const calculateMultiplicationNumbers: MathProblemCalculator = (numTop, numBottom) => {
    return numTop * numBottom;
};

const calculatorMap: Record<MathSymbol, MathProblemCalculator> = {
    [MathSymbol.Addition]: calculateAdditionNumbers,
    [MathSymbol.Multiplication]: calculateMultiplicationNumbers,
    [MathSymbol.Subtraction]: calculateSubtractionNumbers,
};

const calculateMathProblem = ({
    symbol,
    bottom,
    top,
}: {
    bottom: number;
    top: number;
    symbol: MathSymbol;
}): number => calculatorMap[symbol](bottom, top);

export const NumberCalculationUtils = {
    calculateMathProblem,
};
