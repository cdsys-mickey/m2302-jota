import { useFormContext, useWatch } from "react-hook-form";
import A19InOutCheckboxView from "./A19InOutCheckboxView";
import A19 from "@/modules/A19";

const A19InOutCheckboxContainer = (props) => {
	const { ...rest } = props;
	const form = useFormContext();
	const dataType = useWatch({
		name: "dataType",
		control: form.control
	})

	if (dataType?.id != A19.DataType.SALE) {
		return false;
	}

	return <A19InOutCheckboxView {...rest} />
}

A19InOutCheckboxContainer.displayName = "A19InOutCheckboxContainer";
export default A19InOutCheckboxContainer;