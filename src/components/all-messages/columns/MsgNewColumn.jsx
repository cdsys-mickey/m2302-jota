import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const MsgNewColumn = (props) => {
	const { ...rest } = props;
	return (
		<ListColumn
			flex
			item
			justifyContent="center"
			pr={1}
			xs={1}
			{...rest}
		/>
	);
};

MsgNewColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

MsgNewColumn.displayName = "MsgNewColumn";
export default MsgNewColumn;
