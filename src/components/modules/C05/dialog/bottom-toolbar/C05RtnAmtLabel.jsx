import FormFieldLabel from "@/shared-components/form/FormFieldLabel";
import PropTypes from "prop-types";
import { useWatch } from "react-hook-form";

export const C05RtnAmtLabel = (props) => {
	const { name = "RtnAmt", ...rest } = props;
	const subtotal = useWatch({
		name,
	});

	return (
		<FormFieldLabel label="應付減額" {...rest}>
			{subtotal}
		</FormFieldLabel>
	);
};

C05RtnAmtLabel.propTypes = {
	name: PropTypes.string,
};

C05RtnAmtLabel.displayName = "C05RtnAmtLabel";
