import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const E021DateColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;

	return (
		<Grid item pr={1} xs={9} sm={9} md={9} lg={3} {...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</Grid>
	);
};

E021DateColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

E021DateColumn.displayName = "E021DateColumn";
export default E021DateColumn;



