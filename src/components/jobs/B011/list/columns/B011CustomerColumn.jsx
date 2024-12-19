import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const B011CustomerColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn pr={1} xs={5} {...rest} />
	);
};

B011CustomerColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

B011CustomerColumn.displayName = "B011CustomerColumn";
export default B011CustomerColumn;

