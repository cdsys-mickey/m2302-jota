import { useCallback } from "react";
import AppDeptPicker from "../../../../fields/AppDeptPicker";
import { useWatch } from "react-hook-form";

export const ZA03DeptsPickerContainer = (props) => {
	const { ...rest } = props;
	const dept = useWatch({
		name: "dept",
	});
	const tagDisabled = useCallback(
		(value) => {
			return value?.DeptID === dept?.DeptID;
		},
		[dept?.DeptID]
	);

	return <AppDeptPicker tagDisabled={tagDisabled} {...rest} />;
};

ZA03DeptsPickerContainer.displayName = "ZA03DeptsPickerContainer";
