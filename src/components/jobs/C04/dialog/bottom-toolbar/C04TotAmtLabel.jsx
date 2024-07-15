import FormFieldLabel from "@/shared-components/form/FormFieldLabel";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { useWatch } from "react-hook-form";

export const C04TotAmtLabel = (props) => {
	const { name = "TotAmt", ...rest } = props;
	const subtotal = useWatch({
		name,
	});

	const formattedSubtotal = useMemo(() => {
		return !isNaN(subtotal) && subtotal !== ""
			? parseFloat(subtotal).toFixed(2)
			: "0.00";
	}, [subtotal]);

	return (
		<FormFieldLabel label="總計" {...rest}>
			{formattedSubtotal}
		</FormFieldLabel>
	);
};

C04TotAmtLabel.propTypes = {
	name: PropTypes.string,
};

C04TotAmtLabel.displayName = "C04TotAmtLabel";
