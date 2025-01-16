import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const MsgIDColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn
			item
			pr={1}
			xs={3}
			{...rest}
		/>
	);
};

MsgIDColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

MsgIDColumn.displayName = "MsgIDColumn";
export default MsgIDColumn;
