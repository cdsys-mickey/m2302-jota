import React from "react";
import { ControlledTextField } from "@/shared-components/controlled/ControlledTextField";
import FormFieldLabel from "@/shared-components/form/FormFieldLabel";
import MuiInputs from "@/shared-modules/mui-inputs";
import { memo } from "react";
import { forwardRef } from "react";

const EditableText = memo(
	forwardRef((props, ref) => {
		const {
			children,
			label,
			name,
			editing = false,
			variant = "body1",
			inputSize = "small",
			inputVariant = "outlined",
			InputLabelProps = MuiInputs.DEFAULT_INPUT_LABEL_PROPS,
			inputProps,
			emptyText = "(空白)",
			...rest
		} = props;

		if (!editing) {
			return (
				<FormFieldLabel
					label={label}
					variant={variant}
					color="text.secondary"
					{...rest}>
					{children || emptyText}
				</FormFieldLabel>
			);
		}

		return (
			<ControlledTextField
				ref={ref}
				variant={inputVariant}
				label={label}
				name={name}
				size={inputSize}
				InputLabelProps={InputLabelProps}
				// fullWidth
				{...inputProps}
			/>
		);
	})
);

EditableText.displayName = "EditableText";

export default EditableText;
