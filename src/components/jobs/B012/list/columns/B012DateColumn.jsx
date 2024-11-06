import { Grid, Skeleton } from "@mui/material";
import { orange } from "@mui/material/colors";
import PropTypes from "prop-types";

const B012DateColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;

	return (
		<Grid item pr={1} xs={9} sm={9} md={9} lg={3} {...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</Grid>
	);
};

B012DateColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

B012DateColumn.displayName = "B012DateColumn";
export default B012DateColumn;


