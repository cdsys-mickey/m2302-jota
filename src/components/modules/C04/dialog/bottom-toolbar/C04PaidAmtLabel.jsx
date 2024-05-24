import FormFieldLabel from "@/shared-components/form/FormFieldLabel";
import PropTypes from "prop-types";
import { useWatch } from "react-hook-form";

export const C04PaidAmtLabel = (props) => {
	const { name = "PaidAmt", ...rest } = props;
	const subtotal = useWatch({
		name,
	});

	return (
		<FormFieldLabel label="已付" {...rest}>
			{subtotal}
		</FormFieldLabel>
	);
};

C04PaidAmtLabel.propTypes = {
	name: PropTypes.string,
};

C04PaidAmtLabel.displayName = "C04PaidAmtLabel";
