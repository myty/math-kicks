import { reducerLogger } from "utils/debugging-utils";
import Faker from "faker";

const consoleMock = jest.spyOn(console, "log");

describe("reduceLogger", () => {
    beforeEach(() => {
        consoleMock.mockReset();
    });

    describe("when called", () => {
        test("it returns reducer", () => {
            // Arrange
            const reducer = jest.fn().mockReturnValue({ test: Faker.datatype.number() });

            // Act
            const loggedReducer = reducerLogger(Faker.random.word(), reducer);

            // Assert
            expect(loggedReducer).toBeDefined();
            expect(loggedReducer).toBeInstanceOf(Function);
        });

        describe("when reducer is called", () => {
            it("returns derived state", () => {
                // Arrange
                const expectedResult = { test: Faker.datatype.number() };
                const reducer = jest.fn().mockReturnValue(expectedResult);
                const state = { test: Faker.datatype.number() };
                const action = {
                    type: Faker.random.word(),
                    test: Faker.datatype.number(),
                };

                // Act
                const loggedReducer = reducerLogger(Faker.random.word(), reducer);
                const result = loggedReducer(state, action);

                // Assert
                expect(result).toBeDefined();
                expect(result).toBe(expectedResult);
            });

            it("calls console.log", () => {
                // Arrange
                const label = Faker.random.word();
                const action = {
                    type: Faker.random.word(),
                    test: Faker.datatype.number(),
                };
                const incomingState = { test: Faker.datatype.number() };
                const outgoingState = { test: Faker.datatype.number() };

                // Act
                reducerLogger(label, jest.fn().mockReturnValue(outgoingState))(
                    incomingState,
                    action,
                );

                // Assert
                expect(consoleMock).toBeCalledWith(
                    expect.stringContaining(label),
                    expect.objectContaining({
                        action,
                        incomingState,
                        outgoingState,
                    }),
                );
            });
        });
    });
});
