import { memo } from "react";
import PropTypes from "prop-types";

const DSGContextMenu = memo((props) => {
	const { ...rest } = props;
	return <Wrapper {...rest}></Wrapper>;
});

DSGContextMenu.propTypes = {};

DSGContextMenu.displayName = "DSGContextMenu";
export default DSGContextMenu;
