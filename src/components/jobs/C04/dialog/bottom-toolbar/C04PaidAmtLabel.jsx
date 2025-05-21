import { FormFieldLabel } from "@/shared-components";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { useWatch } from "react-hook-form";

export const C04PaidAmtLabel = (props) => {
	const { name = "PaidAmt", ...rest } = props;
	const subtotal = useWatch({
		name,
	});

	const formattedSubtotal = useMemo(() => {
		return !isNaN(subtotal) && subtotal !== ""
			? parseFloat(subtotal).toFixed(2)
			: "0.00";
	}, [subtotal]);

	return (
		<FormFieldLabel label="已付" {...rest}>
			{formattedSubtotal}
		</FormFieldLabel>
	);
};

C04PaidAmtLabel.propTypes = {
	name: PropTypes.string,
};

C04PaidAmtLabel.displayName = "C04PaidAmtLabel";
