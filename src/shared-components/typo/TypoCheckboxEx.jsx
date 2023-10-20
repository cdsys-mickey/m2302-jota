import React, { forwardRef, memo, useMemo } from "react";
import ControlledCheckboxEx from "@/shared-components/controlled/ControlledCheckboxEx";
import MuiInputs from "@/shared-modules/mui-inputs";
import FormFieldLabel from "../form/FormFieldLabel";

const TypoCheckboxEx = memo(
	forwardRef((props, ref) => {
		const {
			// Typography
			label,
			value,
			renderText,
			typoVariant = "body1",
			typographyProps,
			emptyText = "(空白)",
			// Input
			name,
			editing = false,
			variant = "outlined",
			size = "small",
			// InputLabelProps = MuiInputs.DEFAULT_INPUT_LABEL_PROPS,
			...rest
		} = props;

		const text = useMemo(() => {
			return renderText ? renderText(value) : value;
		}, [renderText, value]);

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
			<ControlledCheckboxEx
				ref={ref}
				label={label}
				name={name}
				variant={variant}
				size={size}
				// InputLabelProps={InputLabelProps}
				{...rest}
			/>
		);
	})
);

TypoCheckboxEx.displayName = "TypoCheckboxEx";

export default TypoCheckboxEx;
