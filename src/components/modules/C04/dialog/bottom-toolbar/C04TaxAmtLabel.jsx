import FormFieldLabel from "@/shared-components/form/FormFieldLabel";
import PropTypes from "prop-types";
import { useWatch } from "react-hook-form";

export const C04TaxAmtLabel = (props) => {
	const { name = "TaxAmt", ...rest } = props;
	const subtotal = useWatch({
		name,
	});

	return (
		<FormFieldLabel label="外加稅額" {...rest}>
			{subtotal}
		</FormFieldLabel>
	);
};

C04TaxAmtLabel.propTypes = {
	name: PropTypes.string,
};

C04TaxAmtLabel.displayName = "C04TaxAmtLabel";
