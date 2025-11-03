import AppDeptPicker from "@/components/fields/AppDeptPicker";
import { AuthContext } from "@/contexts/auth/AuthContext";
import { ZA03Context } from "@/contexts/ZA03/ZA03Context";
import Auth from "@/modules/Auth.mjs";
import { useContext, useMemo } from "react";
import { useFormContext } from "react-hook-form";

const ZA03DeptPickerContainer = (props) => {
	const { ...rest } = props;
	const za03 = useContext(ZA03Context);
	const { operator } = useContext(AuthContext);
	const form = useFormContext();

	const _scope = useMemo(() => {
		return operator.Class >= Auth.SCOPES.ROOT ? Auth.SCOPES.HQ : Auth.SCOPES.BRANCH_HQ;
	}, [operator?.Class])


	return (
		<AppDeptPicker
			typo
			required
			disableOpenOnInput
			// scope={Auth.SCOPES.BRANCH_HQ}
			scope={_scope}
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