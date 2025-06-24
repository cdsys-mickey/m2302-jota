import { ButtonEx } from "@/shared-components";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import PropTypes from "prop-types";
import { memo } from "react";

const ReportSubmitButton = memo((props) => {
	const { onClick, children = "執行", size = "small", ...rest } = props;

	return (
		<ButtonEx
			name="submit"
			responsive
			startIcon={<OpenInNewIcon />}
			variant="contained"
			color="primary"
			type="submit"
			onClick={onClick}
			size={size}
			{...rest}
		>
			{children}
		</ButtonEx>
	);
})

ReportSubmitButton.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
	size: PropTypes.string,
	onClick: PropTypes.func
}

ReportSubmitButton.displayName = "ReportSubmitButton";
export default ReportSubmitButton;