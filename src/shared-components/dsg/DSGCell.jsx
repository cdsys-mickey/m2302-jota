import { memo } from "react";
import PropTypes from "prop-types";

const DSGCell = memo((props) => {
	const { ...rest } = props;
	return <Wrapper {...rest}></Wrapper>;
});

DSGCell.propTypes = {};

DSGCell.displayName = "DSGCell";
export default DSGCell;
