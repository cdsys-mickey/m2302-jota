import FormFieldLabel from "@/shared-components/form/FormFieldLabel";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { useWatch } from "react-hook-form";

export const C05RtnAmtLabel = (props) => {
	const { name = "RtnAmt", ...rest } = props;
	const subtotal = useWatch({
		name,
	});

	const formattedSubtotal = useMemo(() => {
		return !isNaN(subtotal) && subtotal !== ""
			? parseFloat(subtotal).toFixed(2)
			: "0.00";
	}, [subtotal]);

	return (
		<FormFieldLabel label="應付減額" {...rest}>
			{formattedSubtotal}
		</FormFieldLabel>
	);
};

C05RtnAmtLabel.propTypes = {
	name: PropTypes.string,
};

C05RtnAmtLabel.displayName = "C05RtnAmtLabel";
