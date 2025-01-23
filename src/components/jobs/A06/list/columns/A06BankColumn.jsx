import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const A06BankColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} xs={5} sx={{ display: { xs: 'none', sm: 'block' } }}{...rest} />
	);
};

A06BankColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

A06BankColumn.displayName = "A06BankColumn";
export default A06BankColumn;
