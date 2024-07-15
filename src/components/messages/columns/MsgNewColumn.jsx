import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";
import FlexGrid from "../../../shared-components/FlexGrid";

const MsgNewColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	return (
		<FlexGrid
			item
			justifyContent="center"
			pr={1}
			xs={4}
			sm={4}
			md={4}
			lg={1}
			{...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</FlexGrid>
	);
};

MsgNewColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

MsgNewColumn.displayName = "MsgNewColumn";
export default MsgNewColumn;
