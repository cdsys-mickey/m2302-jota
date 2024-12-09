import ControlledDatePicker from "@/shared-components/date-picker/ControlledDatePicker";
import FormFieldLabel from "@/shared-components/form/FormFieldLabel";
import { forwardRef, memo, useMemo } from "react";
import DateTimes from "@/shared-modules/sd-date-times";
import { useWatch } from "react-hook-form";
import PropTypes from "prop-types";
import DateFormats from "@/shared-modules/sd-date-formats";

const TypoDatePicker = memo(
	forwardRef((props, ref) => {
		const {
			// Common
			children,
			label,
			// Typography
			dateFormat = DateFormats.DATEFNS_DATE,
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
				? DateTimes.format(value, dateFormat)
				: null;
		}, [children, dateFormat, value]);

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
			<ControlledDatePicker
				ref={ref}
				label={label}
				name={name}
				variant={variant}
				size={size}
				// InputLabelProps={InputLabelProps}
				// fullWidth
				{...rest}
			/>
		);
	})
);
TypoDatePicker.propTypes = {
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
	dateFormat: PropTypes.string
}
TypoDatePicker.displayName = "TypoDatePicker";

export default TypoDatePicker;
