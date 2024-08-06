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
			type,
			label,
			// Typography
			typographyProps,
			emptyText = "(空白)",
			maskedText = "(已隱藏)",
			typoVariant = "body1",
			renderLabel,
			// Input
			name,
			editing = false,
			size = "small",
			variant = "outlined",
			...rest
		} = props;

		const value = useWatch({
			name,
		});

		const memoisedText = useMemo(() => {
			return value && type === "password"
				? maskedText
				: renderLabel
				? renderLabel(value)
				: value;
		}, [maskedText, renderLabel, type, value]);

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
	renderLabel: PropTypes.func,
};
export default TypoTextField;
