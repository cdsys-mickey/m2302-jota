import CustomerPicker from "@/components/picker/CustomerPicker";
import { useWatch } from "react-hook-form";
import PropTypes from "prop-types";

export const AdaptiveCustomerPicker = (props) => {
	const { retailName, ...rest } = props;

	const retail = useWatch({
		name: retailName,
	});

	return (
		<CustomerPicker
			forNew={retail}
			virtualize
			// {...(retail && {
			// 	sharedKey: "retail-customer"
			// })}
			{...rest}
		/>
	)
}

AdaptiveCustomerPicker.propTypes = {
	retailName: PropTypes.string.isRequired
}
AdaptiveCustomerPicker.displayName = "AdaptiveCustomerPicker";