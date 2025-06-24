import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const P42BankColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} xs={9} sx={{ display: { xs: 'none', sm: 'block' } }} {...rest} />
	);
};

P42BankColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

P42BankColumn.displayName = "P42BankColumn";
export default P42BankColumn;



