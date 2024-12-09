import FormFieldLabel from "@/shared-components/form/FormFieldLabel";
import DateFormats from "@/shared-modules/sd-date-formats";
import DateTimes from "@/shared-modules/sd-date-times";
import PropTypes from "prop-types";
import { forwardRef, memo, useMemo } from "react";
import { useWatch } from "react-hook-form";
import ControlledTimePicker from "./ControlledTimePicker";

const TypoTimePicker = memo(
	forwardRef((props, ref) => {
		const {
			// Common
			children,
			label,
			// Typography
			timeFormat = DateFormats.DATEFNS_TIME,
			emptyText = "(空白)",
			typoVariant = "body1",
			typoProps,
			// Input
			name,
			editing = false,
			size = "small",
			variant = "filled",
			...rest
		} = props;

		const value = useWatch({
			name,
		});

		const memoisedText = useMemo(() => {
			if (children) {
				return children;
			}
			return value
				? DateTimes.format(value, timeFormat)
				: null;
		}, [children, timeFormat, value]);

		if (!editing) {
			return (
				<FormFieldLabel
					label={label}
					variant={typoVariant}
					emptyText={emptyText}
					{...typoProps}>
					{memoisedText}
				</FormFieldLabel>
			);
		}

		return (
			<ControlledTimePicker
				ref={ref}
				label={label}
				name={name}
				variant={variant}
				size={size}
				{...rest}
			/>
		);
	})
);
TypoTimePicker.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
	type: PropTypes.string,
	label: PropTypes.string,
	typoProps: PropTypes.object,
	emptyText: PropTypes.string,
	maskedText: PropTypes.string,
	typoVariant: PropTypes.string,
	name: PropTypes.string,
	editing: PropTypes.bool,
	size: PropTypes.string,
	variant: PropTypes.string,
	InputLabelProps: PropTypes.object,
	renderLabel: PropTypes.func,
	timeFormat: PropTypes.string
}
TypoTimePicker.displayName = "TypoTimePicker";

export default TypoTimePicker;
