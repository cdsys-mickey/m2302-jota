import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const G08AmtColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} xs={3} {...rest} />
	);
};

G08AmtColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

G08AmtColumn.displayName = "G08AmtColumn";
export default G08AmtColumn;


