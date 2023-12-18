import { ControlledWebApiOptionPicker } from "@/shared-components/controlled/ControlledWebApiOptionPicker";
import FormFieldLabel from "@/shared-components/form/FormFieldLabel";
import { forwardRef, memo, useMemo } from "react";
import PropTypes from "prop-types";

const TypoWebApiOptionPicker = memo(
	forwardRef((props, ref) => {
		const {
			// Common
			children,
			readOnly = false,
			value,
			label,
			// Typography
			typoVariant = "body1",
			TypographyProps,
			emptyText = "(空白)",
			// Input
			name,
			editing = true,
			size = "small",
			variant = "outlined",
			// METHODS
			getOptionLabel,
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
					{...TypographyProps}>
					{text}
				</FormFieldLabel>
			);
		}

		return (
			<ControlledWebApiOptionPicker
				name={name}
				ref={ref}
				label={label}
				variant={variant}
				size={size}
				// methods
				getOptionLabel={getOptionLabel}
				disabled={readOnly}
				{...rest}
			/>
		);
	})
);

TypoWebApiOptionPicker.displayName = "TypoWebApiOptionPicker";
TypoWebApiOptionPicker.propTypes = {
	children: PropTypes.node,
	readOnly: PropTypes.bool,
};

export default TypoWebApiOptionPicker;
