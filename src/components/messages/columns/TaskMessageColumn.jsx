import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const TaskMessageColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	return (
		<Grid item pr={1} xs={9} sm={9} md={9} lg={19} {...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</Grid>
	);
};

TaskMessageColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

TaskMessageColumn.displayName = "TaskMessageColumn";
export default TaskMessageColumn;