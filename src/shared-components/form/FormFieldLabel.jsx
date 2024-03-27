import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import { forwardRef, memo } from "react";
import FormLabelEx from "./FormLabelEx";
import MuiStyles from "../../shared-modules/sd-mui-styles";
import { useMemo } from "react";
import Types from "../../shared-modules/sd-types";

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
			sx = [],
			...rest
		} = props;

		const useEmptyText = useMemo(() => {
			return !children && emptyText;
		}, [children, emptyText]);

		const typoVariant = useMemo(() => {
			return useEmptyText ? "body2" : "body1";
		}, [useEmptyText]);

		const body = useMemo(
			() => children || emptyText,
			[children, emptyText]
		);

		return (
			<Box ref={ref}>
				{label && (
					<FormLabelEx
						{...labelProps}
						sx={[
							{},
							labelStyles,
							...(Array.isArray(sx) ? sx : [sx]),
						]}>
						{label}
					</FormLabelEx>
				)}
				{Types.isString(body)
					? body?.split("\n").map((s, index) => (
							<Typography
								key={`${s}_${index}`}
								color="text.secondary"
								variant={typoVariant}
								sx={[
									(theme) => ({
										fontWeight: 600,
										marginLeft: theme.spacing(0.5),
										...(!useEmptyText && {
											color: theme.palette.primary.main,
										}),
									}),
									...(Array.isArray(typographySx)
										? typographySx
										: [typographySx]),
								]}
								{...rest}>
								{s}
							</Typography>
					  ))
					: body}
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
	typographySx: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default FormFieldLabel;
