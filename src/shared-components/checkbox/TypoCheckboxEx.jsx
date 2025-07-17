import { forwardRef, memo, useMemo } from "react";
import ControlledCheckboxEx from "@/shared-components/checkbox/ControlledCheckboxEx";
import { FormFieldLabel } from "@/shared-components";
import { useWatch } from "react-hook-form";
import PropTypes from "prop-types";

const DEFAULT_GET_LABEL = (value) => {
	return value != null
		? (value ? "是" : "否")
		: "";
}

const TypoCheckboxEx = memo(
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
			<ControlledCheckboxEx
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

TypoCheckboxEx.displayName = "TypoCheckboxEx";
TypoCheckboxEx.propTypes = {
	getLabel: PropTypes.func,
	slotProps: PropTypes.object
}
export default TypoCheckboxEx;
