import { forwardRef, memo, useMemo } from "react";
import { FormFieldLabel } from "@/shared-components";
import { useWatch } from "react-hook-form";
import PropTypes from "prop-types";
import ControlledCheckboxExField from "./ControlledCheckboxExField";

const DEFAULT_GET_LABEL = (value) => {
	return value != null
		? (value ? "是" : "否")
		: "";
}

const TypoCheckboxExField = memo(
	forwardRef((props, ref) => {
		const {
			// children,
			// Typography
			label,
			// value,
			renderText,
			typoVariant = "body1",
			typoProps,
			emptyText = "(空白)",
			// Input
			name,
			editing = false,
			variant,
			size = "small",
			getLabel = DEFAULT_GET_LABEL,
			slotProps,
			...rest
		} = props;

		const value = useWatch({
			name,
		});

		const momoisedText = useMemo(() => {
			return getLabel ? getLabel(value) : value;
		}, [getLabel, value]);

		if (!editing) {
			return (
				<FormFieldLabel
					name={name}
					label={label}
					variant={typoVariant}
					emptyText={emptyText}
					{...typoProps}
					{...slotProps?.label}>
					{momoisedText}
				</FormFieldLabel>
			);
		}

		return (
			<ControlledCheckboxExField
				ref={ref}
				label={label}
				name={name}
				variant={variant}
				size={size}
				slotProps={slotProps}
				// InputLabelProps={InputLabelProps}
				{...rest}
			/>
		);
	})
);

TypoCheckboxExField.displayName = "TypoCheckboxExField";
TypoCheckboxExField.propTypes = {
	getLabel: PropTypes.func,
	slotProps: PropTypes.object
}
export default TypoCheckboxExField;
