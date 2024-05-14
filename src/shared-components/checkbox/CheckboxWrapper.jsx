import ControlledCheckboxEx from "./ControlledCheckboxEx";
import { TypoCheckboxExContainer } from "./TypoCheckboxExContainer";
import PropTypes from "prop-types";

const CheckboxExWrapper = (props) => {
	const { typo, ...rest } = props;

	if (typo) {
		return <TypoCheckboxExContainer {...rest} />;
	}

	return <ControlledCheckboxEx {...rest} />;
};

CheckboxExWrapper.propTypes = {
	typo: PropTypes.bool,
};

CheckboxExWrapper.displayName = "CheckboxExWrapper";
export default CheckboxExWrapper;
