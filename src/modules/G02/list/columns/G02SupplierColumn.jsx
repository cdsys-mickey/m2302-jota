import ListColumn from "@/shared-components/listview/ListColumn";
import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const G02SupplierColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} xs={9} {...rest} />
	);
};

G02SupplierColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

G02SupplierColumn.displayName = "G02SupplierColumn";
export default G02SupplierColumn;

