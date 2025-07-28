import PropTypes from "prop-types";
import TypoLabelContainer from "./TypoLabelContainer";
import TypoLabelView from "./TypoLabelView";

const TypoLabelWrapper = (props) => {
	const { name, ...rest } = props;
	if (name) {
		return <TypoLabelContainer name={name} {...rest} />
	}
	return <TypoLabelView {...rest} />
}

TypoLabelWrapper.displayName = "TypoLabelWrapper";
TypoLabelWrapper.propTypes = {
	name: PropTypes.string
}
export default TypoLabelWrapper;