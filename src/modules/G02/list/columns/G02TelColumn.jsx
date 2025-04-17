import ListColumn from "@/shared-components/listview/ListColumn";
import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const G02TelColumn = (props) => {
	const { ...rest } = props;

	return (
		<ListColumn item pr={1} xs={5} {...rest} />
	);
};

G02TelColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

G02TelColumn.displayName = "G02TelColumn";
export default G02TelColumn;

