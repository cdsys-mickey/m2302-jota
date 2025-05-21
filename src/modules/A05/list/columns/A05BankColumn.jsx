import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const A05BankColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} xs={9} sx={{ display: { xs: 'none', sm: 'block' } }} {...rest} />
	);
};

A05BankColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

A05BankColumn.displayName = "A05BankColumn";
export default A05BankColumn;
