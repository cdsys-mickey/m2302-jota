import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";
import FlexGrid from "@/shared-components/FlexGrid";

const D02NumColumn = (props) => {
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

D02NumColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

D02NumColumn.displayName = "D02NumColumn";
export default D02NumColumn;

