import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import { forwardRef, memo } from "react";
import FormLabelEx from "./FormLabelEx";
import MuiStyles from "../../shared-modules/sd-mui-styles";

/**
 * 增加 label 功能的 Typography
 */
const FormFieldLabel = memo(
	forwardRef((props, ref) => {
		const {
			label,
			children,
			labelProps,
			labelStyles = MuiStyles.DEFAULT_FORM_LABEL_STYLES,
			typographySx,
			emptyText = "(空白)",
			...rest
		} = props;

		return (
			<Box ref={ref}>
				{label && (
					<FormLabelEx {...labelProps} sx={labelStyles}>
						{label}
					</FormLabelEx>
				)}

				<Typography
					ref={ref}
					color="text.secondary"
					sx={[
						(theme) => ({
							...(children && {
								color: theme.palette.primary.main,
							}),
						}),
						...(Array.isArray(typographySx)
							? typographySx
							: [typographySx]),
					]}
					{...rest}>
					{children || emptyText}
				</Typography>
			</Box>
		);
	})
);

FormFieldLabel.displayName = "TypegraphyEx";
FormFieldLabel.propTypes = {
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	children: PropTypes.node,
	labelProps: PropTypes.object,
	labelStyles: PropTypes.object,
	emptyText: PropTypes.string,
	typographySx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default FormFieldLabel;
