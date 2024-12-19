import ListColumn from "@/shared-components/listview/ListColumn";
import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const B05SupplierColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} xs={10} {...rest} />
	);
};

B05SupplierColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

B05SupplierColumn.displayName = "B05SupplierColumn";
export default B05SupplierColumn;
