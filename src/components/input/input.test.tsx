import * as useInputController from "./use-input-controller";
import { render, screen } from "@testing-library/react";
import React from "react";
import Input from "components/input/input";
import { InputProps } from "./use-input-controller";

describe("Input", () => {
    it("renders", () => {
        // Arrange
        const onChangeMock = jest.fn();
        const changeInputValueMock = jest.fn();
        const props: InputProps = {
            className: "mr-4",
            id: "max",
            label: "Max",
            onChange: onChangeMock,
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

        // Act
        render(<Input {...props} />);

        // Assert
        const input = screen.getByRole("textbox", {
            name: props.label,
        });
        expect(screen.getByLabelText(props.label)).toContainElement(input);
        expect(input).toHaveAttribute("id", props.id);
        expect(input).toHaveAttribute("type", props.type);
        expect(input).toHaveAttribute("value", props.value);
        expect(input).not.toHaveAttribute("max");
        expect(input).not.toHaveAttribute("min");
    });
});
