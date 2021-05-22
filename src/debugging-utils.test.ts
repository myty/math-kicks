import { reducerLogger } from "./debugging-utils";

describe("reduceLogger", () => {
    describe("when called", () => {
        test("it returns reducer", () => {
            // Arrange
            const label = "test-label";
            const expectedResult = {};
            const reducer = jest.fn().mockReturnValue(expectedResult);

            // Act
            const loggedReducer = reducerLogger(label, reducer);

            // Assert
            expect(loggedReducer).toBeDefined();
            expect(loggedReducer).toBeInstanceOf(Function);
        });

        describe("when reducer is called", () => {
            it("returns derived state", () => {
                // Arrange
                const label = "test-label";
                const expectedResult = {};
                const reducer = jest.fn().mockReturnValue(expectedResult);
                const state = {};
                const action = {};

                // Act
                const loggedReducer = reducerLogger(label, reducer);
                const result = loggedReducer(state, action);

                // Assert
                expect(result).toBeDefined();
                expect(result).toBe(expectedResult);
            });

            it("calls console.log", () => {
                // Arrange
                const consoleMock = jest.spyOn(console, "log");

                // Act
                reducerLogger("label", jest.fn().mockReturnValue({}))({}, {});

                // Assert
                expect(consoleMock).toBeCalled();
            });
        });
    });
});
