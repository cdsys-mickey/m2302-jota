import ListColumn from "@/shared-components/listview/ListColumn";
import PropTypes from "prop-types";

const P36BankColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} xs={9} sx={{ display: { xs: 'none', sm: 'block' } }} {...rest} />
	);
};

P36BankColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

P36BankColumn.displayName = "P36BankColumn";
export default P36BankColumn;



