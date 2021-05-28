import { MathSymbol } from "enums/math-symbol";
import { MathProblem } from "hooks/use-math-sheet";

interface MathGeneratorOptions {
    count: number;
    min: number;
    max: number;
}

type MathProblemGenerator = (options: MathGeneratorOptions) => Array<MathProblem>;

const generateAdditionNumbers: MathProblemGenerator = ({ max, min, count }) => {
    const mathFacts: Array<MathProblem> = [];
    const getNextRandomNumber = () => min + Math.round(Math.random() * (max - min));

    for (let index = 0; index < count; index++) {
        const prevMathProblem = index == 0 ? undefined : mathFacts[index - 1];
        let mathProblem: MathProblem;

        do {
            const num1 = getNextRandomNumber();
            const num2 = getNextRandomNumber();

            mathProblem = num1 > num2 ? { num1, num2 } : { num1: num2, num2: num1 };
        } while (
            prevMathProblem?.num1 === mathProblem.num1 &&
            prevMathProblem.num2 === mathProblem.num2
        );

        mathFacts[index] = mathProblem;
    }

    return mathFacts;
};

const generateSubtractionNumbers: MathProblemGenerator = ({ max, min, count }) => {
    const mathFacts: Array<MathProblem> = new Array(count);
    const getNextRandomNumber = () => min + Math.round(Math.random() * (max - min));

    for (let index = 0; index < count; index++) {
        const prevMathProblem = index == 0 ? undefined : mathFacts[index - 1];
        let mathProblem: MathProblem;

        do {
            const num1 = getNextRandomNumber();
            const num2 = getNextRandomNumber();

            mathProblem = num1 > num2 ? { num1, num2 } : { num1: num2, num2: num1 };
        } while (
            prevMathProblem?.num1 === mathProblem.num1 &&
            prevMathProblem.num2 === mathProblem.num2
        );

        mathFacts[index] = mathProblem;
    }

    return mathFacts;
};

const generateMultiplicationNumbers: MathProblemGenerator = ({ max, min, count }) => {
    const mathFacts: Array<MathProblem> = [];
    const getNextRandomNumber = () => min + Math.round(Math.random() * (max - min));

    for (let index = 0; index < count; index++) {
        mathFacts.push({
            num1: getNextRandomNumber(),
            num2: getNextRandomNumber(),
        });
    }

    return mathFacts;
};

const generateMathProblemsMap: Record<MathSymbol, MathProblemGenerator> = {
    [MathSymbol.Addition]: generateAdditionNumbers,
    [MathSymbol.Multiplication]: generateMultiplicationNumbers,
    [MathSymbol.Subtraction]: generateSubtractionNumbers,
};

const generateMathProblems = ({
    symbol,
    ...options
}: MathGeneratorOptions & { symbol: MathSymbol }): Array<MathProblem> =>
    generateMathProblemsMap[symbol](options);

export const NumberGenerationUtils = {
    generateMathProblems,
};
