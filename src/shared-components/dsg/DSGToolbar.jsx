import PropTypes from "prop-types";
import { memo } from "react";
import FlexBox from "../FlexBox";

const DSGToolbar = memo((props) => {
	const { children, sx = [], ...rest } = props;
	return (
		<FlexBox
			sx={[
				(theme) => ({
					"& > *": {
						marginLeft: theme.spacing(3)
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