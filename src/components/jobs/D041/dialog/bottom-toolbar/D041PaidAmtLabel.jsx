import FormFieldLabel from "@/shared-components/form/FormFieldLabel";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { useWatch } from "react-hook-form";

export const D041PaidAmtLabel = (props) => {
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

D041PaidAmtLabel.propTypes = {
	name: PropTypes.string,
};

D041PaidAmtLabel.displayName = "D041PaidAmtLabel";