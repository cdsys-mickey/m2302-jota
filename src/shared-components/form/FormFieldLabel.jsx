import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import React, { forwardRef, memo } from "react";
import FormLabelEx from "./FormLabelEx";
import MuiInputs from "@/shared-modules/mui-inputs";

/**
 * 增加 label 功能的 Typography
 */
const FormFieldLabel = memo(
	forwardRef((props, ref) => {
		const {
			label,
			children,
			labelProps,
			labelStyles = MuiInputs.DEFAULT_FORM_LABEL_STYLES,
			typographyStyles,
			emptyText = "(空白)",
			...rest
		} = props;
		// if (!label) {
		// 	return (
		// 		<Typography ref={ref} {...rest}>
		// 			{children}
		// 		</Typography>
		// 	);
		// }

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
						typographyStyles,
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
};

export default FormFieldLabel;
