import { FormFieldLabel } from "@/shared-components";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { useWatch } from "react-hook-form";

export const F03PayAmtLabel = (props) => {
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

F03PayAmtLabel.propTypes = {
	name: PropTypes.string,
};

F03PayAmtLabel.displayName = "F03PayAmtLabel";

