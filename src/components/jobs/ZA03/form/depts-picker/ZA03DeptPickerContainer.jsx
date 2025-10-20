import AppDeptPicker from "@/components/fields/AppDeptPicker";
import { ZA03Context } from "@/contexts/ZA03/ZA03Context";
import Auth from "@/modules/Auth.mjs";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";

const ZA03DeptPickerContainer = (props) => {
	const { ...rest } = props;
	const za03 = useContext(ZA03Context);
	const form = useFormContext();

	return (
		<AppDeptPicker
			typo
			required
			disableOpenOnInput
			scope={Auth.SCOPES.BRANCH_HQ}
			onChange={za03.handleDeptChange({ setValue: form.setValue, getValues: form.getValues })}
			{...rest}
		// scopeByOperator
		/>
	);
}

ZA03DeptPickerContainer.propTypes = {

}

ZA03DeptPickerContainer.displayName = "ZA03DeptPickerContainer";
export default ZA03DeptPickerContainer;