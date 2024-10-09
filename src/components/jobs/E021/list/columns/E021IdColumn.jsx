import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const E021IdColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	return (
		<Grid item pr={1} xs={4} sm={4} md={4} lg={3} {...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</Grid>
	);
};

E021IdColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

E021IdColumn.displayName = "E021IdColumn";
export default E021IdColumn;



