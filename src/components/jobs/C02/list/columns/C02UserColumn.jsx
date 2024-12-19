import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const C02UserColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} xs={5} {...rest} />
	);
};

C02UserColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

C02UserColumn.displayName = "C02UserColumn";
export default C02UserColumn;
