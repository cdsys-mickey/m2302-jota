import { Box, Paper } from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";

/**
 * 用來定義
 */
export const OptionPickerGridPaper = memo(
	forwardRef((props, ref) => {
		const {
			children,
			loading = false,
			elevation = 8,
			HeaderComponent,
			...rest
		} = props;
		return (
			<Paper ref={ref} elevation={elevation} {...rest}>
				{!loading && (
					<HeaderComponent />
				)}
				<Box
					sx={[
						(theme) => ({
							...(!loading && {
								"& .MuiAutocomplete-listbox": {
									// marginTop: theme.spacing(-1),
								},
							}),
						}),
					]}>
					{children}
				</Box>
			</Paper>
		);
	})
);

OptionPickerGridPaper.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
	loading: PropTypes.bool,
	HeaderComponent: PropTypes.elementType,
	elevation: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

OptionPickerGridPaper.displayName = "OptionGridPaper";
