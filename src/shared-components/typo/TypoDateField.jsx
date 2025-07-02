import { useMemo } from "react";
import ControlledDateField from "@/shared-components/controlled/ControlledDateField";
import { FormFieldLabel } from "@/shared-components";
import { memo } from "react";
import { forwardRef } from "react";
import { useWatch } from "react-hook-form";
import { format } from "date-fns";
import DateTimes from "@/shared-modules/DateTimes.mjs";
import PropTypes from "prop-types";

const TypoDateField = memo(
	forwardRef((props, ref) => {
		const {
			// Common
			dateFormat = DateTimes.DATEFNS_DATE,
			label,
			// Typography
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
			return value ? format(value, dateFormat) : null || emptyText;
		}, [dateFormat, emptyText, value]);

		if (!editing) {
			return (
				<FormFieldLabel
					label={label}
					variant={typoVariant}
					color="text.secondary"
					{...typoProps}>
					{memoisedText}
				</FormFieldLabel>
			);
		}

		return (
			<ControlledDateField
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

export default TypoDateField;
TypoDateField.propTypes = {
	dateFormat: PropTypes.string,
};
