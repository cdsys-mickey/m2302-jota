import { memo } from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";

const AppInfoFrame = memo((props) => {
	const { ...rest } = props;
	return <Box {...rest}></Box>;
});

AppInfoFrame.propTypes = {};

AppInfoFrame.displayName = "AppInfoFrame";
export default AppInfoFrame;
