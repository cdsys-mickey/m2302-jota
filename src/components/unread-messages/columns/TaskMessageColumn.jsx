import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const TaskMessageColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn
			// pr={1} 
			xs={16.5}
			{...rest}
		/>
	);
};

TaskMessageColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

TaskMessageColumn.displayName = "TaskMessageColumn";
export default TaskMessageColumn;
