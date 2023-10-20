import { ControlledWebApiOptionsPicker } from "@/shared-components/controlled/ControlledWebApiOptionsPicker";
import FormFieldLabel from "@/shared-components/form/FormFieldLabel";
import React, { forwardRef, memo, useMemo } from "react";

const TypoWebApiOptionsPicker = memo(
	forwardRef((props, ref) => {
		const {
			// Common
			children,
			value,
			label,
			// Typography
			getOptionLabel,
			renderText,
			typoVariant = "body1",
			typographyProps,
			emptyText = "(空白)",
			// Input
			name,
			editing = true,
			size = "small",
			variant = "outlined",

			...rest
		} = props;

		const text = useMemo(() => {
			if (children) {
				return children;
			}
			if (renderText) {
				return renderText ? renderText(value) : value;
			}

			if (getOptionLabel) {
				return getOptionLabel(value);
			}

			return value;
		}, [children, getOptionLabel, renderText, value]);

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
			<ControlledWebApiOptionsPicker
				ref={ref}
				label={label}
				name={name}
				variant={variant}
				size={size}
				// methods
				getOptionLabel={getOptionLabel}
				{...rest}
			/>
		);
	})
);

TypoWebApiOptionsPicker.displayName = "TypoWebApiOptionsPicker";

export default TypoWebApiOptionsPicker;
