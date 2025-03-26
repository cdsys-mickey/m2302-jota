import { useFormContext, useWatch } from "react-hook-form";
import A19FreeCheckboxView from "./A19FreeCheckboxView";
import A19 from "@/modules/A19";

const A19FreeCheckboxContainer = (props) => {
	const { ...rest } = props;

	const form = useFormContext();
	const dataType = useWatch({
		name: "dataType",
		control: form.control
	})

	if (dataType?.id != A19.DataType.SALE) {
		return false;
	}

	return <A19FreeCheckboxView {...rest} />
}

A19FreeCheckboxContainer.displayName = "A19FreeCheckboxContainer";
export default A19FreeCheckboxContainer;