import FormFieldLabel from "@/shared-components/form/FormFieldLabel";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { useWatch } from "react-hook-form";

export const D041TaxAmtLabel = (props) => {
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

D041TaxAmtLabel.propTypes = {
	name: PropTypes.string,
};

D041TaxAmtLabel.displayName = "D041TaxAmtLabel";
