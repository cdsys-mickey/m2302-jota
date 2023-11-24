import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const A01ClassNColumn = (props) => {
	const { loading, children, ...rest } = props;
	return (
		<Grid item pr={1} xs={12} sm={12} md={4} lg={4} {...rest}>
			{loading ? <Skeleton /> : children || ""}
		</Grid>
	);
};

A01ClassNColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

A01ClassNColumn.displayName = "A01ClassNColumn";
export default A01ClassNColumn;
