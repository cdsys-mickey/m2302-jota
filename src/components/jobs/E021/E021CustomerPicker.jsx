import CustomerPicker from "@/components/picker/CustomerPicker";
import { useWatch } from "react-hook-form";
import PropTypes from "prop-types";

export const E021CustomerPicker = (props) => {
	const { retailName, ...rest } = props;

	const retail = useWatch({
		name: retailName,
	});

	return <CustomerPicker forNew={retail} autoLabel {...rest} />
}

E021CustomerPicker.propTypes = {
	retailName: PropTypes.string.isRequired
}
E021CustomerPicker.displayName = "E021CustomerPicker";
