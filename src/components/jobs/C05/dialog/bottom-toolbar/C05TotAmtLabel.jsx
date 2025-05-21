import { FormFieldLabel } from "@/shared-components";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { useWatch } from "react-hook-form";

export const C05TotAmtLabel = (props) => {
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
		<FormFieldLabel label="總計金額" {...rest}>
			{formattedSubtotal}
		</FormFieldLabel>
	);
};

C05TotAmtLabel.propTypes = {
	name: PropTypes.string,
};

C05TotAmtLabel.displayName = "C05TotAmtLabel";
