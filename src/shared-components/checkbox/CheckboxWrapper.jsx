import ControlledCheckboxEx from "./ControlledCheckboxEx";
import { TypoCheckboxExContainer } from "./TypoCheckboxExContainer";
import PropTypes from "prop-types";

const CheckboxWrapper = (props) => {
	const { typo, ...rest } = props;

	if (typo) {
		return <TypoCheckboxExContainer {...rest} />;
	}

	return <ControlledCheckboxEx {...rest} />;
};

CheckboxWrapper.propTypes = {
	typo: PropTypes.bool,
};

CheckboxWrapper.displayName = "CheckboxWrapper";
export default CheckboxWrapper;
