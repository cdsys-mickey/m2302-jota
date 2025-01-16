import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const MsgTimeColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn
			item
			pr={1}
			xs={4}
			{...rest}
		/>
	);
};

MsgTimeColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

MsgTimeColumn.displayName = "MsgTimeColumn";
export default MsgTimeColumn;
