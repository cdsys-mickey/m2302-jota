import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";
import FlexGrid from "../../../shared-components/FlexGrid";

const TaskJobColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	return (
		<FlexGrid
			item
			pr={1}
			xs={2}
			justifyContent="center"
			{...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</FlexGrid>
	);
};

TaskJobColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

TaskJobColumn.displayName = "TaskJobColumn";
export default TaskJobColumn;
