import { ControlledOptionPicker } from "@/shared-components/controlled/ControlledOptionPicker";
import FormFieldLabel from "@/shared-components/form/FormFieldLabel";
import { forwardRef, memo, useMemo } from "react";
import PropTypes from "prop-types";

const TypoOptionPicker = memo(
	forwardRef((props, ref) => {
		const {
			// Common
			readOnly = false,
			name,
			children,
			value,
			label,
			// Typography
			typoVariant = "body1",
			typographyProps,
			emptyText = "(空白)",
			// Input
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
					{...typographyProps}>
					{text}
				</FormFieldLabel>
			);
		}

		return (
			<ControlledOptionPicker
				disabled={readOnly}
				name={name}
				ref={ref}
				label={label}
				variant={variant}
				size={size}
				// methods
				getOptionLabel={getOptionLabel}
				{...rest}
			/>
		);
	})
);

TypoOptionPicker.displayName = "TypoOptionPicker";
TypoOptionPicker.propTypes = {
	children: PropTypes.node,
	readOnly: PropTypes.bool,
};

export default TypoOptionPicker;
