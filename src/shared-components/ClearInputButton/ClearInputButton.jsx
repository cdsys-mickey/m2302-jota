import { memo } from "react";
import PropTypes from "prop-types";
import { IconButton, Tooltip } from "@mui/material";
import { useCallback } from "react";
import ClearIcon from "@mui/icons-material/Clear";

const ClearInputButton = memo((props) => {
	const {
		value,
		onChange,
		IconComponent = ClearIcon,
		IconProps,
		...rest
	} = props;

	const handleClear = useCallback(
		(e) => {
			e?.stopPropagation();
			onChange("");
		},
		[onChange]
	);

	return (
		<Tooltip title={value ? "清除" : ""}>
			<IconButton
				onClick={handleClear}
				color="inherit"
				size="small"
				sx={[
					(theme) => ({
						visibility: "hidden",
						opacity: 0,
						transition: theme.transitions.create("opacity", {
							easing: theme.transitions.easing.sharp,
							duration: theme.transitions.duration.leavingScreen,
						}),
						...(value && {
							opacity: 100,
							visibility: "visible",
						}),
					}),
				]}
				{...rest}>
				<IconComponent
					color="action"
					fontSize="small"
					position="end"
					{...IconProps}
				/>
			</IconButton>
		</Tooltip>
	);
});

ClearInputButton.propTypes = {
	value: PropTypes.string,
	onChange: PropTypes.func,
	IconComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.elementType]),
	IconProps: PropTypes.object,
};

ClearInputButton.displayName = "ClearInputButton";
export default ClearInputButton;
