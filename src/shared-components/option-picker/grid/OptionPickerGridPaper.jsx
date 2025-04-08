import { Box, Paper } from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";

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
					<Box
						px={2}
						sx={{
							borderBottom: "1px solid rgb(0,0,0,0.1)",
							position: "relative"
						}}>
						<HeaderComponent />
					</Box>
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
