import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import { Box, Typography } from "@mui/material";

const FormSectionTitle = memo(
	forwardRef((props, ref) => {
		const { children, ...rest } = props;
		return (
			<Box ref={ref} {...rest}>
				<Typography
					variant="subtitle1"
					sx={[
						(theme) => ({
							fontWeight: 600,
							fontSize: "100%",
							// color: theme.palette.primary.main,
							color: theme.palette.text.primary,
							// color: theme.palette.neutral.main,
						}),
					]}>
					{children}
				</Typography>
			</Box>
		);
	})
);

FormSectionTitle.propTypes = {
	children: PropTypes.node,
};

FormSectionTitle.displayName = "FormSectionTitle";

export default FormSectionTitle;
