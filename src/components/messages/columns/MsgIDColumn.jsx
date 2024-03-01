import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const MsgIDColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	return (
		<Grid item pr={1} xs={4} sm={4} md={4} lg={3} {...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</Grid>
	);
};

MsgIDColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

MsgIDColumn.displayName = "MsgIDColumn";
export default MsgIDColumn;
