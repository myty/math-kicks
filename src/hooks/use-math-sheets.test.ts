import useMathSheet from "hooks/use-math-sheet";
import { act, renderHook } from "@testing-library/react-hooks";

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
            expect(result.current.mathFacts).toHaveLength(totalCount);
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

            // Act
            act(() => result.current.changeMinimum("-1"));

            // Assert
            expect(result.all[1]).toBe(result.all[2]);
        });
    });

    describe("when changeMinimum value is 'a'", () => {
        it("returns the hook unchanged", () => {
            //Arrange
            const { result } = renderHook(() => useMathSheet());

            // Act
            act(() => result.current.changeMinimum("a"));

            // Assert
            expect(result.all[1]).toBe(result.all[2]);
        });
    });
});
