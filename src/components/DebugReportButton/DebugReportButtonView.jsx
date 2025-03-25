import BugReportIcon from "@mui/icons-material/BugReport";
import { Button } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";

const DebugReportButtonView = memo((props) => {
	const { children, size = "small", ...rest } = props;

	return (
		<Button
			variant="contained"
			color="neutral-light"
			startIcon={<BugReportIcon />}
			size={size}
			sx={{
				"& .MuiButton-startIcon": {
					marginRight: 0
				}
			}}
			{...rest}>
			{children}
		</Button>
	);
})

DebugReportButtonView.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
	size: PropTypes.string
}

DebugReportButtonView.displayName = "ReportSubmitButton";
export default DebugReportButtonView;