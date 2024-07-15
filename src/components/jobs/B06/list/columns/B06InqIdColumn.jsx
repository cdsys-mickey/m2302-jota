import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const B06InqIdColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	return (
		<Grid item pr={1} xs={9} sm={9} md={9} lg={3} {...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</Grid>
	);
};

B06InqIdColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

B06InqIdColumn.displayName = "B06InqIdColumn";
export default B06InqIdColumn;
