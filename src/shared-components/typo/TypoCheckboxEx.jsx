import React, { forwardRef, memo, useMemo } from "react";
import ControlledCheckboxEx from "@/shared-components/controlled/ControlledCheckboxEx";
import FormFieldLabel from "../form/FormFieldLabel";

const TypoCheckboxEx = memo(
	forwardRef((props, ref) => {
		const {
			children,
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
			...rest
		} = props;

		const text = useMemo(() => {
			return children || value;
		}, [children, value]);

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
