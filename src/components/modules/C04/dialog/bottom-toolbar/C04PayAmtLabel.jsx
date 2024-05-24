import FormFieldLabel from "@/shared-components/form/FormFieldLabel";
import PropTypes from "prop-types";
import { useWatch } from "react-hook-form";

export const C04PayAmtLabel = (props) => {
	const { name = "PayAmt", ...rest } = props;
	const subtotal = useWatch({
		name,
	});

	return (
		<FormFieldLabel label="應付" {...rest}>
			{subtotal}
		</FormFieldLabel>
	);
};

C04PayAmtLabel.propTypes = {
	name: PropTypes.string,
};

C04PayAmtLabel.displayName = "C04PayAmtLabel";
