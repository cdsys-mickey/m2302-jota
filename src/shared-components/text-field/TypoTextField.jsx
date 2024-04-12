import { ControlledTextField } from "@/shared-components/controlled/ControlledTextField";
import React, { forwardRef, memo, useMemo } from "react";

import FormFieldLabel from "@/shared-components/form/FormFieldLabel";
import MuiStyles from "../../shared-modules/sd-mui-styles";
import { useWatch } from "react-hook-form";

const TypoTextField = memo(
	forwardRef((props, ref) => {
		const {
			// Common
			children,
			label,
			// Typography
			typographyProps,
			emptyText = "(空白)",
			// Input
			name,
			editing = false,
			size = "small",
			variant = "outlined",
			InputLabelProps = MuiStyles.DEFAULT_INPUT_LABEL_PROPS,

			...rest
		} = props;

		const value = useWatch({
			name,
		});

		const memoisedText = useMemo(() => {
			return children || value;
		}, [children, value]);

		if (!editing) {
			return (
				<FormFieldLabel
					label={label}
					emptyText={emptyText}
					{...typographyProps}>
					{memoisedText}
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
