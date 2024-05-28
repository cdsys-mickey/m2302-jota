import FormFieldLabel from "@/shared-components/form/FormFieldLabel";
import PropTypes from "prop-types";
import { useWatch } from "react-hook-form";

export const C05TaxAmtLabel = (props) => {
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

C05TaxAmtLabel.propTypes = {
	name: PropTypes.string,
};

C05TaxAmtLabel.displayName = "C05TaxAmtLabel";
