import ControlledDatePicker from "@/shared-components/controlled/ControlledDatePicker";
import FormFieldLabel from "@/shared-components/form/FormFieldLabel";
import React, { forwardRef, memo, useMemo } from "react";

const TypoDatePicker = memo(
	forwardRef((props, ref) => {
		const {
			// Common
			children,
			value,
			label,
			// Typography
			renderText,
			emptyText = "(空白)",
			typoVariant = "body1",
			typographyProps,
			// Input
			name,
			editing = false,
			size = "small",
			variant = "filled",
			// InputLabelProps = MuiInputs.DEFAULT_INPUT_LABEL_PROPS,
			...rest
		} = props;

		const text = useMemo(() => {
			if (children) {
				return children;
			}
			return (renderText ? renderText(value) : value) || emptyText;
		}, [children, emptyText, renderText, value]);

		if (!editing) {
			return (
				<FormFieldLabel
					label={label}
					variant={typoVariant}
					{...typographyProps}>
					{text}
				</FormFieldLabel>
			);
		}

		return (
			<ControlledDatePicker
				ref={ref}
				label={label}
				name={name}
				variant={variant}
				size={size}
				// InputLabelProps={InputLabelProps}
				// fullWidth
				{...rest}
			/>
		);
	})
);

TypoDatePicker.displayName = "TypoDatePicker";

export default TypoDatePicker;
