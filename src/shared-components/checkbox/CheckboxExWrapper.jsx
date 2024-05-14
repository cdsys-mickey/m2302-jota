import ControlledCheckboxEx from "./ControlledCheckboxEx";
import { TypoCheckboxExContainer } from "./TypoCheckboxExContainer";
import PropTypes from "prop-types";

const CheckboxExWrapper = (props) => {
	const { typo, getLabel, ...rest } = props;

	if (typo) {
		return <TypoCheckboxExContainer getLabel={getLabel} {...rest} />;
	}

	return <ControlledCheckboxEx {...rest} />;
};

CheckboxExWrapper.propTypes = {
	typo: PropTypes.bool,
	getLabel: PropTypes.func,
};

CheckboxExWrapper.displayName = "CheckboxExWrapper";
export default CheckboxExWrapper;
