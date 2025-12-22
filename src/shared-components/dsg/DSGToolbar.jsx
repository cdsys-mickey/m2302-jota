import PropTypes from "prop-types";
import { memo } from "react";
import FlexBoxView from "../FlexBox/FlexBoxView";

const DSGToolbar = memo((props) => {
	const { children, sx = [], ...rest } = props;
	return (
		<FlexBox
			sx={[
				(theme) => ({
					"& > *": {
						gap: theme.spacing(1),
						minHeight: "29px"
					}
				}),
				...(Array.isArray(sx) ? sx : [sx]),
			]}
			{...rest}
		>
			{children}
		</FlexBox>
	);
})

DSGToolbar.propTypes = {
	sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array])
}

DSGToolbar.displayName = "DSGToolbar";
export default DSGToolbar;