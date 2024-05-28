import FormFieldLabel from "@/shared-components/form/FormFieldLabel";
import PropTypes from "prop-types";
import { useWatch } from "react-hook-form";

export const C05RecvAmtLabel = (props) => {
	const { name = "RecvAmt", ...rest } = props;
	const subtotal = useWatch({
		name,
	});

	return (
		<FormFieldLabel label="已收金額" {...rest}>
			{subtotal}
		</FormFieldLabel>
	);
};

C05RecvAmtLabel.propTypes = {
	name: PropTypes.string,
};

C05RecvAmtLabel.displayName = "C05RecvAmtLabel";
