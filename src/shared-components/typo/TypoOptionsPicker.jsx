import { ControlledOptionsPicker } from "@/shared-components/controlled/ControlledOptionsPicker";
import FormFieldLabel from "@/shared-components/form/FormFieldLabel";
import { forwardRef, memo, useMemo } from "react";
import PropTypes from "prop-types";

const TypoOptionsPicker = memo(
	forwardRef((props, ref) => {
		const {
			// Common
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
			<ControlledOptionsPicker
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

TypoOptionsPicker.displayName = "TypoOptionsPicker";
TypoOptionsPicker.propTypes = {
	children: PropTypes.node,
};

export default TypoOptionsPicker;
