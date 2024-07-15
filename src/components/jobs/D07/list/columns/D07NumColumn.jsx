import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";
import FlexGrid from "@/shared-components/FlexGrid";

const D07NumColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	return (
		<FlexGrid
			justifyContent="flex-end"
			item
			pr={1}
			xs={4}
			sm={4}
			md={4}
			lg={2}
			{...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</FlexGrid>
	);
};

D07NumColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

D07NumColumn.displayName = "D07NumColumn";
export default D07NumColumn;



