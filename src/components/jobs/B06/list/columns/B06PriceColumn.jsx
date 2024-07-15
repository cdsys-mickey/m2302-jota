import { Skeleton } from "@mui/material";
import PropTypes from "prop-types";
import FlexGrid from "../../../../../shared-components/FlexGrid";

const B06PriceColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	return (
		<FlexGrid
			item
			pr={1}
			xs={9}
			sm={9}
			md={9}
			lg={3}
			justifyContent="flex-end"
			{...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</FlexGrid>
	);
};

B06PriceColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

B06PriceColumn.displayName = "B06PriceColumn";
export default B06PriceColumn;
