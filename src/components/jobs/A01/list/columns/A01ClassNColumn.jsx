import ListColumn from "@/shared-components/listview/ListColumn";
import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const A01ClassNColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	return (
		<ListColumn item pr={1} xs={4}  {...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</ListColumn>
	);
};

A01ClassNColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

A01ClassNColumn.displayName = "A01ClassNColumn";
export default A01ClassNColumn;
