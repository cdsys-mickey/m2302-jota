import { memo } from "react";
import PropTypes from "prop-types";
import AppDeptPicker from "@/components/fields/AppDeptPicker";
import Auth from "@/modules/Auth.mjs";
import { useContext } from "react";
import { ZA03Context } from "@/contexts/ZA03/ZA03Context";
import { useFormContext } from "react-hook-form";

const ZA03DeptPicker = memo((props) => {
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
})

ZA03DeptPicker.propTypes = {

}

ZA03DeptPicker.displayName = "ZA03DeptPicker";
export default ZA03DeptPicker;