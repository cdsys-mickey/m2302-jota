import { ControlledOptionPicker } from "@/shared-components/option-picker/ControlledOptionPicker";
import FormFieldLabel from "@/shared-components/form/FormFieldLabel";
import { forwardRef, memo, useMemo } from "react";
import PropTypes from "prop-types";
import { useWatch } from "react-hook-form";

const TypoOptionPicker = memo(
	forwardRef((props, ref) => {
		const {
			// Common
			multiple,
			readOnly = false,
			name,
			children,
			// value,
			label,
			// Typography
			typoVariant = "body1",
			typoProps,
			emptyText = "(空白)",
			// Input
			editing = true,
			size = "small",
			variant = "outlined",
			// METHODS
			getOptionLabel,
			...rest
		} = props;

		// const text = useMemo(() => {
		// 	return children || value;
		// }, [children, value]);

		const value = useWatch({
			name,
		});

		const memoisedText = useMemo(() => {
			// console.log(`${name}.memoisedText`, value);
			if (children) {
				return children;
			}
			if (multiple) {
				return value
					?.map((i) => (getOptionLabel ? getOptionLabel(i) : i))
					.join(", ");
			}
			return getOptionLabel ? getOptionLabel(value) : value;
		}, [children, getOptionLabel, multiple, value]);

		if (!editing) {
			return (
				<FormFieldLabel
					label={label}
					variant={typoVariant}
					emptyText={emptyText}
					{...typoProps}>
					{/* {text} */}
					{memoisedText}
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
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
	readOnly: PropTypes.bool,
};

export default TypoOptionPicker;
