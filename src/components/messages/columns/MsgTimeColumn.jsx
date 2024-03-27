import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const MsgTimeColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	return (
		<Grid item pr={1} xs={9} sm={9} md={9} lg={4} {...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</Grid>
	);
};

MsgTimeColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

MsgTimeColumn.displayName = "MsgTimeColumn";
export default MsgTimeColumn;
