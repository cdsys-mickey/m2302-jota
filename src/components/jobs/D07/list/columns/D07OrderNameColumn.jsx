import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const D07OrderNameColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	return (
		<Grid item pr={1} xs={4} sm={4} md={4} lg={10} {...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</Grid>
	);
};

D07OrderNameColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

D07OrderNameColumn.displayName = "D07OrderNameColumn";
export default D07OrderNameColumn;
