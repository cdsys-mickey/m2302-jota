import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const MsgNameColumn = (props) => {
	const { ...rest } = props;
	return (
		<ListColumn
			item
			pr={1}
			xs={11}
			{...rest}
		/>
	);
};

MsgNameColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

MsgNameColumn.displayName = "MsgNameColumn";
export default MsgNameColumn;
