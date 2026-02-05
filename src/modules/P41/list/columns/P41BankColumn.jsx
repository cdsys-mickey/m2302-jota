import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const P41BankColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} xs={3.5} md={2} sx={{ display: { xs: 'none', sm: 'block' } }} {...rest} />
	);
};

P41BankColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

P41BankColumn.displayName = "P41BankColumn";
export default P41BankColumn;



