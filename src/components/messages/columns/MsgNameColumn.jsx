import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const MsgNameColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	return (
		<Grid item pr={1} xs={9} sm={9} md={9} lg={13} {...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</Grid>
	);
};

MsgNameColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

MsgNameColumn.displayName = "MsgNameColumn";
export default MsgNameColumn;
