import { FormFieldLabel } from "@/shared-components";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { useWatch } from "react-hook-form";

export const D01TotAmtLabel = (props) => {
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

D01TotAmtLabel.propTypes = {
	name: PropTypes.string,
};

D01TotAmtLabel.displayName = "D01TotAmtLabel";
