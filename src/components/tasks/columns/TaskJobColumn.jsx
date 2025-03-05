import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const TaskJobColumn = (props) => {
	const { ...rest } = props;
	return (
		<ListColumn
			flex
			justifyContent="center"
			// pl={1}
			xs={3}
			{...rest} />
	);
};

TaskJobColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

TaskJobColumn.displayName = "TaskJobColumn";
export default TaskJobColumn;
