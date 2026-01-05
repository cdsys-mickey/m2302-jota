import ListColumn from "@/shared-components/listview/ListColumn";
import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const D07IdColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	return (
		<ListColumn item pr={1} xs={4} sm={4} md={4} lg={3} {...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</ListColumn>
	);
};

D07IdColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

D07IdColumn.displayName = "D07IdColumn";
export default D07IdColumn;
