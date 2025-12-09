import CustomerPicker from "@/components/picker/CustomerPicker";
import { useWatch } from "react-hook-form";
import PropTypes from "prop-types";

export const E01CustomerPicker = (props) => {
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

E01CustomerPicker.propTypes = {
	retailName: PropTypes.string.isRequired
}
E01CustomerPicker.displayName = "E01CustomerPicker";