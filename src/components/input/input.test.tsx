import * as useInputController from "./use-input-controller";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import Input from "components/input/input";
import { InputProps } from "./use-input-controller";
import Faker from "faker";

describe("Input", () => {
    const changeInputValueMock = jest.fn();

    let props: InputProps;

    const renderInput = (props: InputProps, role: string) => {
        render(<Input {...props} />);

        const input = screen.getByRole(role, {
            name: props.label,
        });

        return { input };
    };

    beforeEach(() => {
        changeInputValueMock.mockReset();

        props = {
            className: "mr-4",
            id: "max",
            label: "Max",
            onChange: jest.fn(),
            type: "text",
            value: "12",
        };

        jest.spyOn(useInputController, "default").mockImplementation(() => ({
            changeInputValue: changeInputValueMock,
            className: props.className,
            id: props.id,
            label: props.label,
            type: props.type,
            value: props.value,
        }));
    });

    afterEach(cleanup);

    it("renders", () => {
        // Arrange & Act
        const { input } = renderInput(props, "textbox");

        // Assert
        expect(screen.getByLabelText(props.label)).toContainElement(input);
        expect(input).toHaveAttribute("id", props.id);
        expect(input).toHaveAttribute("type", props.type);
        expect(input).toHaveAttribute("value", props.value);
        expect(input).not.toHaveAttribute("max");
        expect(input).not.toHaveAttribute("min");
    });

    describe("props", () => {
        describe("when type is 'number'", () => {
            it(`renders input with type="number"`, () => {
                // Arrange
                const type = "number";

                props = {
                    ...props,
                    type,
                    min: 0,
                    max: 12,
                    value: 0,
                };

                // Act
                const { input } = renderInput(props, "spinbutton");

                // Assert
                expect(input).toHaveAttribute("type", type);
            });
        });

        describe("when type is 'text'", () => {
            it(`renders input with type="text"`, () => {
                // Arrange
                const type = "text";

                props = {
                    ...props,
                    type,
                    value: Faker.datatype.string(1),
                };

                // Act
                const { input } = renderInput(props, "textbox");

                // Assert
                expect(input).toHaveAttribute("type", type);
            });
        });
    });

    describe("when input value changes", () => {
        it("calls changeInputValue", () => {
            // Arrange
            const expectedOnChangeValue = Faker.datatype.string(6);
            const { input } = renderInput(props, "textbox");

            // Act
            fireEvent.change(input, { target: { value: expectedOnChangeValue } });

            // Assert
            expect(changeInputValueMock).toHaveBeenCalledTimes(1);
        });
    });
});
