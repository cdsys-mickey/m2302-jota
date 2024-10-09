import FlexGrid from "@/shared-components/FlexGrid";
import { Grid, Skeleton } from "@mui/material";
import PropTypes from "prop-types";

const E021FlagColumn = (props) => {
	const { loading, children, ...rest } = props;
	const isLoading = loading && !children;
	return (
		<FlexGrid item pr={1} xs={4} sm={4} md={4} lg={2} justifyContent="center" {...rest}>
			{isLoading ? <Skeleton /> : children || ""}
		</FlexGrid>
	);
};

E021FlagColumn.propTypes = {
	loading: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node]),
};

E021FlagColumn.displayName = "E021FlagColumn";
export default E021FlagColumn;

