import FormFieldLabel from "@/shared-components/form/FormFieldLabel";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { useWatch } from "react-hook-form";

export const D07TotAmtLabel = (props) => {
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

D07TotAmtLabel.propTypes = {
	name: PropTypes.string,
};

D07TotAmtLabel.displayName = "D07TotAmtLabel";
