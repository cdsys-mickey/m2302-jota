import { useCallback } from "react";
import AppDeptPicker from "../../../../fields/AppDeptPicker";
import { useFormContext, useWatch } from "react-hook-form";
import Auth from "@/modules/md-auth";
import { useContext } from "react";
import { ZA03Context } from "@/contexts/ZA03/ZA03Context";

export const ZA03DeptsPickerContainer = (props) => {
	const { ...rest } = props;
	const za03 = useContext(ZA03Context);
	const form = useFormContext();
	const dept = useWatch({
		name: "dept",
	});
	const tagDisabled = useCallback(
		(value) => {
			return value?.DeptID === dept?.DeptID;
		},
		[dept?.DeptID]
	);

	return (
		<AppDeptPicker
			multiple
			filterSelectedOptions
			disableOpenOnInput
			// scopeByOperator
			scope={Auth.SCOPES.BRANCH_HQ}
			typoChip
			tagDisabled={tagDisabled}
			onChange={za03.handleDeptsChange({ getValues: form.getValues, setValue: form.setValue })}
			{...rest}
		/>
	);
};

ZA03DeptsPickerContainer.displayName = "ZA03DeptsPickerContainer";
