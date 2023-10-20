import React, { forwardRef, memo, useMemo } from "react";
import { ControlledTextField } from "@/shared-components/controlled/ControlledTextField";

import MuiInputs from "@/shared-modules/mui-inputs";
import FormFieldLabel from "@/shared-components/form/FormFieldLabel";

const TypoTextField = memo(
	forwardRef((props, ref) => {
		const {
			// Common
			children,
			value,
			label,
			// Typography
			renderText,
			typoVariant = "body1",
			typographyProps,
			emptyText = "(空白)",
			// Input
			name,
			editing = false,
			size = "small",
			variant = "outlined",
			InputLabelProps = MuiInputs.DEFAULT_INPUT_LABEL_PROPS,

			...rest
		} = props;

		const text = useMemo(() => {
			if (children) {
				return children;
			}
			return renderText ? renderText(value) : value;
		}, [children, renderText, value]);

		if (!editing) {
			return (
				<FormFieldLabel
					label={label}
					variant={typoVariant}
					emptyText={emptyText}
					{...typographyProps}>
					{text}
				</FormFieldLabel>
			);
		}
		return (
			<ControlledTextField
				ref={ref}
				label={label}
				name={name}
				variant={variant}
				size={size}
				InputLabelProps={InputLabelProps}
				// fullWidth
				{...rest}
			/>
		);
	})
);

TypoTextField.displayName = "TypoTextField";

export default TypoTextField;
