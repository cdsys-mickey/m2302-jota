import { FormFieldLabel } from "@/shared-components";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { useWatch } from "react-hook-form";

export const C05TaxAmtLabel = (props) => {
	const { name = "TaxAmt", ...rest } = props;
	const subtotal = useWatch({
		name,
	});

	const formattedSubtotal = useMemo(() => {
		return !isNaN(subtotal) && subtotal !== ""
			? parseFloat(subtotal).toFixed(2)
			: "0.00";
	}, [subtotal]);

	return (
		<FormFieldLabel label="外加稅額" {...rest}>
			{formattedSubtotal}
		</FormFieldLabel>
	);
};

C05TaxAmtLabel.propTypes = {
	name: PropTypes.string,
};

C05TaxAmtLabel.displayName = "C05TaxAmtLabel";
