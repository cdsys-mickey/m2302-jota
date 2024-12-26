import { useCallback } from "react";
import AppDeptPicker from "../../../../fields/AppDeptPicker";
import { useFormContext, useWatch } from "react-hook-form";
import Auth from "@/modules/md-auth";
import { useContext } from "react";
import { ZA03Context } from "@/contexts/ZA03/ZA03Context";
import { useMemo } from "react";
import { AuthContext } from "@/contexts/auth/AuthContext";

export const ZA03DeptsPickerContainer = (props) => {
	const { ...rest } = props;
	const { operator } = useContext(AuthContext);
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

	const _scope = useMemo(() => {
		return operator.Class >= 3 ? Auth.SCOPES.HQ : Auth.SCOPES.BRANCH_HQ;
	}, [operator.Class])

	return (
		<AppDeptPicker
			multiple
			filterSelectedOptions
			disableOpenOnInput
			// scopeByOperator
			scope={_scope}
			typoChip
			tagDisabled={tagDisabled}
			onChange={za03.handleDeptsChange({ getValues: form.getValues, setValue: form.setValue })}
			{...rest}
		/>
	);
};

ZA03DeptsPickerContainer.displayName = "ZA03DeptsPickerContainer";
