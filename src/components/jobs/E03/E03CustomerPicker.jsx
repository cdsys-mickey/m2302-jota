import CustomerPicker from "@/components/picker/CustomerPicker";
import { useWatch } from "react-hook-form";
import PropTypes from "prop-types";

export const E03CustomerPicker = (props) => {
	const { retailName, ...rest } = props;

	const retail = useWatch({
		name: retailName,
	});

	return (
		<CustomerPicker
			forNew={retail}
			{...rest}
		/>
	)
}

E03CustomerPicker.propTypes = {
	retailName: PropTypes.string.isRequired
}
E03CustomerPicker.displayName = "E03CustomerPicker";

