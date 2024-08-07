import { memo } from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/system";

const DSGCell = memo((props) => {
	const { ...rest } = props;
	return <Box {...rest}></Box>;
});

DSGCell.propTypes = {};

DSGCell.displayName = "DSGCell";
export default DSGCell;
