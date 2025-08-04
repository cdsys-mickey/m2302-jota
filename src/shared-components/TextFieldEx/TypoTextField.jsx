import { ControlledTextField } from "@/shared-components/TextFieldEx/ControlledTextField";
import { forwardRef, memo, useMemo } from "react";

import { FormFieldLabel } from "@/shared-components";
import PropTypes from "prop-types";
import { useWatch } from "react-hook-form";

const TypoTextField = memo(
	forwardRef((props, ref) => {
		const {
			// Common
			type,
			label,
			slotProps,
			// Typography
			typoProps,
			emptyText = "(空白)",
			maskedText = "(已隱藏)",
			typoVariant = "body1",
			renderLabel,
			// Input
			name,
			// loading = false,
			editing = false,
			size = "small",
			variant = "outlined",
			inline = false,
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
					name={name}
					label={label}
					variant={typoVariant}
					emptyText={emptyText}
					inline={inline}
					// loading={loading}
					{...slotProps?.label}
					{...typoProps}
				>
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
				inline={inline}
				slotProps={slotProps}
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
	typoProps: PropTypes.object,
	emptyText: PropTypes.string,
	maskedText: PropTypes.string,
	typoVariant: PropTypes.string,
	name: PropTypes.string,
	editing: PropTypes.bool,
	loading: PropTypes.bool,
	inline: PropTypes.bool,
	size: PropTypes.string,
	variant: PropTypes.string,
	InputLabelProps: PropTypes.object,
	slotProps: PropTypes.object,
	renderLabel: PropTypes.func,

};
export default TypoTextField;
