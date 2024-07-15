import FormFieldLabel from "@/shared-components/form/FormFieldLabel";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { useWatch } from "react-hook-form";

export const D02PayAmtLabel = (props) => {
	const { name = "PayAmt", ...rest } = props;
	const subtotal = useWatch({
		name,
	});

	const formattedSubtotal = useMemo(() => {
		return !isNaN(subtotal) && subtotal !== ""
			? parseFloat(subtotal).toFixed(2)
			: "0.00";
	}, [subtotal]);

	return (
		<FormFieldLabel label="應付" {...rest}>
			{formattedSubtotal}
		</FormFieldLabel>
	);
};

D02PayAmtLabel.propTypes = {
	name: PropTypes.string,
};

D02PayAmtLabel.displayName = "D02PayAmtLabel";
