import { ControlledTextField } from "@/shared-components/controlled/ControlledTextField";
import { forwardRef, memo, useMemo } from "react";

import FormFieldLabel from "@/shared-components/form/FormFieldLabel";
import { useWatch } from "react-hook-form";
import MuiStyles from "@/shared-modules/sd-mui-styles";
import PropTypes from "prop-types";

const TypoTextField = memo(
	forwardRef((props, ref) => {
		const {
			// Common
			children,
			type,
			label,
			// Typography
			typographyProps,
			emptyText = "(空白)",
			maskedText = "(已隱藏)",
			typoVariant = "body1",
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
			return children || type === "password" ? maskedText : value;
		}, [children, maskedText, type, value]);

		if (!editing) {
			return (
				<FormFieldLabel
					label={label}
					variant={typoVariant}
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
				type={type}
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
TypoTextField.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
	type: PropTypes.string,
	label: PropTypes.string,
	typographyProps: PropTypes.object,
	emptyText: PropTypes.string,
	maskedText: PropTypes.string,
	typoVariant: PropTypes.string,
	name: PropTypes.string,
	editing: PropTypes.bool,
	size: PropTypes.string,
	variant: PropTypes.string,
	InputLabelProps: PropTypes.object,
};
export default TypoTextField;
