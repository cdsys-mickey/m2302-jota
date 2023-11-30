import { ControlledWebApiOptionsPicker } from "@/shared-components/controlled/ControlledWebApiOptionsPicker";
import FormFieldLabel from "@/shared-components/form/FormFieldLabel";
import { forwardRef, memo, useMemo } from "react";
import PropTypes from "prop-types";

const TypoWebApiOptionsPicker = memo(
	forwardRef((props, ref) => {
		const {
			// Common
			children,
			value,
			label,
			// Typography
			typoVariant = "body1",
			typographyProps,
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
					{...typographyProps}>
					{text}
				</FormFieldLabel>
			);
		}

		return (
			<ControlledWebApiOptionsPicker
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

TypoWebApiOptionsPicker.displayName = "TypoWebApiOptionsPicker";
TypoWebApiOptionsPicker.propTypes = {
	children: PropTypes.node,
};

export default TypoWebApiOptionsPicker;
