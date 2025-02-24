import { SvgIcon } from "@mui/material";
import PropTypes from "prop-types";

const MdiIcon = ({ path, ...props }) => (
	<SvgIcon {...props}>
		<path d={path} />
	</SvgIcon>
);

MdiIcon.propTypes = {
	path: PropTypes.string.required,
}
export default MdiIcon;