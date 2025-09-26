import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const TaskDeptColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn flex justifyContent="center" xs={4.5} {...rest} />
	);
};

TaskDeptColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

TaskDeptColumn.displayName = "TaskDeptColumn";
export default TaskDeptColumn;
