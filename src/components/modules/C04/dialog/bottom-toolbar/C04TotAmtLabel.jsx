import FormFieldLabel from "@/shared-components/form/FormFieldLabel";
import PropTypes from "prop-types";
import { useWatch } from "react-hook-form";

export const C04TotAmtLabel = (props) => {
	const { name = "TotAmt", ...rest } = props;
	const subtotal = useWatch({
		name,
	});

	return (
		<FormFieldLabel label="總計" {...rest}>
			{subtotal}
		</FormFieldLabel>
	);
};

C04TotAmtLabel.propTypes = {
	name: PropTypes.string,
};

C04TotAmtLabel.displayName = "C04TotAmtLabel";
