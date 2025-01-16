import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const MsgJobColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn
			item
			flex
			pr={1}
			xs={2}
			justifyContent="center"
			{...rest}
		/>
	);
};

MsgJobColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

MsgJobColumn.displayName = "MsgJobColumn";
export default MsgJobColumn;
