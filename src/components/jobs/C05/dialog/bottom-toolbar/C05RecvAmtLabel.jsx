import FormFieldLabel from "@/shared-components/form/FormFieldLabel";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { useWatch } from "react-hook-form";

export const C05RecvAmtLabel = (props) => {
	const { name = "RecvAmt", ...rest } = props;
	const subtotal = useWatch({
		name,
	});

	const formattedSubtotal = useMemo(() => {
		return !isNaN(subtotal) && subtotal !== ""
			? parseFloat(subtotal).toFixed(2)
			: "0.00";
	}, [subtotal]);

	return (
		<FormFieldLabel label="已收金額" {...rest}>
			{formattedSubtotal}
		</FormFieldLabel>
	);
};

C05RecvAmtLabel.propTypes = {
	name: PropTypes.string,
};

C05RecvAmtLabel.displayName = "C05RecvAmtLabel";
