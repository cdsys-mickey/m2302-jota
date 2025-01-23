import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const A06AreaColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} xs={3} sx={{ display: { xs: 'none', sm: 'block' } }}{...rest} />
	);
};

A06AreaColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

A06AreaColumn.displayName = "A06AreaColumn";
export default A06AreaColumn;
