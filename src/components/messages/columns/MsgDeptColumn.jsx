import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const MsgDeptColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn
			item
			pr={1}
			xs={2}
			{...rest}
		/>
	);
};

MsgDeptColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

MsgDeptColumn.displayName = "MsgDeptColumn";
export default MsgDeptColumn;
