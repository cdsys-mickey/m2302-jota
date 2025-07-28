import { memo } from "react";
import PropTypes from "prop-types";
import { RadioGroup } from "@mui/material";

const RadioGroupExViewComponent = (props) => {
	const { children, ...rest } = props;
	return (
		<RadioGroup {...rest}>{children}</RadioGroup>
	);
}

RadioGroupExViewComponent.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.func])
}
const RadioGroupExView = memo(RadioGroupExViewComponent);
export default RadioGroupExView;