import FormFieldLabel from "@/shared-components/form/FormFieldLabel";
import PropTypes from "prop-types";
import { useWatch } from "react-hook-form";

export const C05TotAmtLabel = (props) => {
	const { name = "TotAmt", ...rest } = props;
	const subtotal = useWatch({
		name,
	});

	return (
		<FormFieldLabel label="總計金額" {...rest}>
			{subtotal}
		</FormFieldLabel>
	);
};

C05TotAmtLabel.propTypes = {
	name: PropTypes.string,
};

C05TotAmtLabel.displayName = "C05TotAmtLabel";
