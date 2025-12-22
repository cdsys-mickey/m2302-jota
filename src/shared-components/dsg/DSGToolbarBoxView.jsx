import { memo } from "react";
import FlexBoxView from "../FlexBox/FlexBoxView";
import PropTypes from "prop-types";

const DSGToolbarBoxViewComponent = (props) => {
	const { children, ...rest } = props;
	return (
		<FlexBox className="dsg-add-row" sx={{
			minHeight: "31px",
			padding: "1px 1px 1px 0",
			"&.dsg-add-row > *": {
				marginRight: 0
			}
		}} {...rest}>
			{children}
		</FlexBox>
	);
}

DSGToolbarBoxViewComponent.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.func])
}
const DSGToolbarBoxView = memo(DSGToolbarBoxViewComponent);
export default DSGToolbarBoxView;