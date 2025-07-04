import ControlledSelectEx from "./ControlledSelectEx";
import SelectExView from "./SelectExView";
import PropTypes from "prop-types";

const SelectExWrapper = (props) => {
	const { name, ...rest } = props;
	if (name) {
		return <ControlledSelectEx name={name} {...rest} />
	}
	return <SelectExView  {...rest} />
}

SelectExWrapper.propTypes = {
	name: PropTypes.string
}
SelectExWrapper.displayName = "SelectExWrapper";
export default SelectExWrapper;