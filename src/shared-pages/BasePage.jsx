import { Box } from "@mui/material";
import PropTypes from "prop-types";

const BasePage = ({ children, sx = [] }) => {
	return (
		<Box sx={[...(Array.isArray(sx) ? sx : [sx])]}>
			<Box>{children}</Box>
		</Box>
	);
};
BasePage.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.func]),
	sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
}
export default BasePage;
