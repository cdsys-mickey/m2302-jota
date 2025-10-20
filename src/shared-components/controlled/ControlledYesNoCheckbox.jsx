import YesNo from "@/modules/md-yes-no";
import { memo } from "react";
import ControlledCheckboxExField from "../CheckboxExField/ControlledCheckboxExField";

const ControlledYesNoCheckbox = memo((props) => {
	const { ...rest } = props;
	return (
		<ControlledCheckboxExField
			valueToChecked={YesNo.valueToChecked}
			checkedToValue={YesNo.checkedToValue}
			{...rest}
		/>
	);
});

ControlledYesNoCheckbox.propTypes = {};

ControlledYesNoCheckbox.displayName = "ControlledYesNoCheckbox";
export default ControlledYesNoCheckbox;
