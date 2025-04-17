import { ButtonGroup } from "@mui/material";
import PropTypes from "prop-types";

const ButtonGroupEx = (props) => {
	const { noDivider, sx = [], ...rest } = props;
	return (
		<ButtonGroup sx={[
			() => ({
				...(noDivider && {
					'& .MuiButtonGroup-grouped:not(:last-of-type)': {
						borderRight: 'none',
					}
				}),
			}),
			...(Array.isArray(sx) ? sx : [sx]),
		]} {...rest} />
	);
}

ButtonGroupEx.propTypes = {
	noDivider: PropTypes.bool,
	sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
}

ButtonGroupEx.displayName = "ButtonGroupEx";
export default ButtonGroupEx;