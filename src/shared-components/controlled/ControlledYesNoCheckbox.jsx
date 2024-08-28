import { memo } from "react";
import PropTypes from "prop-types";
import YesNo from "@/modules/md-yes-no";
import ControlledCheckboxEx from "../checkbox/ControlledCheckboxEx";

const ControlledYesNoCheckbox = memo((props) => {
	const { ...rest } = props;
	return (
		<ControlledCheckboxEx
			valueToChecked={YesNo.valueToChecked}
			checkedToValue={YesNo.checkedToValue}
			{...rest}
		/>
	);
});

ControlledYesNoCheckbox.propTypes = {};

ControlledYesNoCheckbox.displayName = "ControlledYesNoCheckbox";
export default ControlledYesNoCheckbox;
