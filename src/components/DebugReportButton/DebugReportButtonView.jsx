import BugReportIcon from "@mui/icons-material/BugReport";
import { Button } from "@mui/material";
import PropTypes from "prop-types";
import { memo, useMemo } from "react";

const DebugReportButtonView = memo((props) => {
	const { children, size = "small", variant, ...rest } = props;

	const _color = useMemo(() => {
		if (variant == "contained") {
			return "neutral-light";
		}
		return null;
	}, [variant])

	return (
		<Button
			// variant="contained"
			{..._color && ({
				color: _color
			})}
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
	variant: PropTypes.string,
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
	size: PropTypes.string
}

DebugReportButtonView.displayName = "ReportSubmitButton";
export default DebugReportButtonView;