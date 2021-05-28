import useMathSheet from "hooks/use-math-sheet";
import { act, renderHook } from "@testing-library/react-hooks";
import Faker from "faker";
import { MathSymbol } from "enums/math-symbol";

describe("useMathSheet()", () => {
    describe("when initialized", () => {
        it("returns results", () => {
            //Arrange
            const totalCount = 80;

            // Act
            const { result } = renderHook(() => useMathSheet({ totalCount }));

            // Assert
            expect(result.current.min).toBe(0);
            expect(result.current.max).toBe(12);
            expect(result.current.mathProblems).toHaveLength(totalCount);
        });
    });

    describe("when totalCount props change", () => {
        it("returns new results", () => {
            //Arrange
            const originalTotalCount = 80;
            const nextTotalCount = 100;
            const { result, rerender } = renderHook((props) => useMathSheet(props), {
                initialProps: { totalCount: originalTotalCount },
            });
            const { mathProblems: originalMathProblems } = result.current;

            // Act
            rerender({ totalCount: nextTotalCount });

            // Assert
            expect(result.current.mathProblems).toHaveLength(nextTotalCount);
            expect(originalMathProblems).not.toEqual(result.current.mathProblems);
        });
    });

    describe("when generate", () => {
        it("creates a new mathFacts array", () => {
            //Arrange
            const { result } = renderHook(() => useMathSheet());

            // Act
            act(() => result.current.generate());

            // Assert
            expect(result.all[1]).not.toBe(result.all[2]);
        });
    });

    describe("when changeMinimum value is < 0", () => {
        it("returns the hook unchanged", () => {
            //Arrange
            const { result } = renderHook(() => useMathSheet());
            const changedValue = Faker.datatype.number({ max: -1 }).toString();

            // Act
            act(() => result.current.changeMinimum(changedValue));

            // Assert
            expect(result.all[1]).toStrictEqual(result.all[2]);
        });
    });

    describe("when changeMinimum value is > 9", () => {
        it("returns the hook unchanged", () => {
            //Arrange
            const { result } = renderHook(() => useMathSheet());
            const changedValue = Faker.datatype.number({ min: 10 }).toString();

            // Act
            act(() => result.current.changeMinimum(changedValue));

            // Assert
            expect(result.all[1]).toStrictEqual(result.all[2]);
        });
    });

    describe("when changeMinimum value is 'a'", () => {
        it("returns the hook unchanged", () => {
            //Arrange
            const { result } = renderHook(() => useMathSheet());
            const changedValue = Faker.random.word().slice(0, 1);

            // Act
            act(() => result.current.changeMinimum(changedValue));

            // Assert
            expect(result.all[1]).toStrictEqual(result.all[2]);
        });
    });

    describe.each([undefined, null, ""])(
        "when changeMinimum value is %s",
        (changedValue) => {
            it("returns the hook unchanged", () => {
                // Arrange
                const { result } = renderHook(() => useMathSheet());

                // Act
                act(() => result.current.changeMinimum(changedValue));

                // Assert
                expect(result.all[1]).toStrictEqual(result.all[2]);
            });
        },
    );

    describe.each([undefined, null, ""])(
        "when changeMaximum value is %s",
        (changedValue) => {
            it("returns the hook unchanged", () => {
                //Arrange
                const { result } = renderHook(() => useMathSheet());

                // Act
                act(() => result.current.changeMaximum(changedValue));

                // Assert
                expect(result.all[1]).toStrictEqual(result.all[2]);
            });
        },
    );

    describe("when changeMinimum value is 2 less than max value", () => {
        it("returns minimum and maximum values changed", () => {
            //Arrange
            const { result } = renderHook(() => useMathSheet());
            const maximumValue = Faker.datatype.number({ min: 3, max: 11 });
            const changedValue = maximumValue - 2;

            // Act
            act(() => result.current.changeMaximum(maximumValue.toString()));
            act(() => result.current.changeMinimum(changedValue.toString()));

            // Assert
            expect(result.current.max).toBe(changedValue + 3);
        });
    });

    describe("when changeMaximum value is 2 greater than min value", () => {
        it("returns minimum and maximum values changed", () => {
            //Arrange
            const { result } = renderHook(() => useMathSheet());
            const expectedMinimumValue = Faker.datatype.number({ min: 1, max: 9 });
            const maximumValue = expectedMinimumValue + 2;

            // Act
            act(() => result.current.changeMinimum(expectedMinimumValue.toString()));
            act(() => result.current.changeMaximum(maximumValue.toString()));

            // Assert
            expect(result.current.min).toBe(maximumValue - 3);
        });
    });

    describe("when changeMaximum value is > 12", () => {
        it("returns the hook unchanged", () => {
            //Arrange
            const { result } = renderHook(() => useMathSheet());
            const changedValue = Faker.datatype.number({ min: 13 }).toString();

            // Act
            act(() => result.current.changeMaximum(changedValue));

            // Assert
            expect(result.all[1]).toStrictEqual(result.all[2]);
        });
    });

    describe("when changeMaximum value is < 3", () => {
        it("returns the hook unchanged", () => {
            //Arrange
            const { result } = renderHook(() => useMathSheet());
            const changedValue = Faker.datatype.number({ max: 2 }).toString();

            // Act
            act(() => result.current.changeMaximum(changedValue));

            // Assert
            expect(result.all[1]).toStrictEqual(result.all[2]);
        });
    });

    describe("when changeMaximum value is a letter", () => {
        it("returns the hook unchanged", () => {
            //Arrange
            const { result } = renderHook(() => useMathSheet());
            const changedValue = Faker.random.word().slice(0, 1);

            // Act
            act(() => result.current.changeMaximum(changedValue));

            // Assert
            expect(result.all[1]).toStrictEqual(result.all[2]);
        });
    });

    describe("when symbol value is changed", () => {
        it("returns new results", () => {
            //Arrange
            const { result } = renderHook(() => useMathSheet());
            const changedValue = MathSymbol.Addition;

            // Act
            act(() => result.current.changeSymbol(changedValue));

            // Assert
            expect(result.all[1]).not.toEqual(result.all[2]);
        });
    });

    describe("when symbol value is not valid", () => {
        it("returns results unchanged", () => {
            //Arrange
            const { result } = renderHook(() => useMathSheet());

            // Act
            act(() => result.current.changeSymbol("a"));

            // Assert
            expect(result.all[1]).toStrictEqual(result.all[2]);
        });
    });
});
