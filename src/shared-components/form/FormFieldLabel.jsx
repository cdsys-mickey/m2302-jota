/* eslint-disable no-mixed-spaces-and-tabs */
import PropTypes from "prop-types";
import { Box, Tooltip, Typography } from "@mui/material";
import { forwardRef, memo } from "react";
import FormLabelEx from "./FormLabelEx";
import MuiStyles from "../../shared-modules/sd-mui-styles";
import { useMemo } from "react";
import Types from "../../shared-modules/sd-types";
import FlexBox from "../FlexBox";
import { now } from "lodash";

/**
 * 增加 label 功能的 Typography
 */
const FormFieldLabel = memo(
	forwardRef((props, ref) => {
		const {
			label,
			children,
			labelProps,
			labelStyles,
			typographySx,
			emptyText = "(空白)",
			sx = [],
			flex = false,
			title,
			arrow,
			noWrap = false,
			...rest
		} = props;

		const _labelStyles = useMemo(() => {
			return labelStyles || (noWrap ? MuiStyles.FORM_LABEL_STYLES_NOWRAP : MuiStyles.DEFAULT_FORM_LABEL_STYLES)
		}, [labelStyles, noWrap]);

		const useEmptyText = useMemo(() => {
			return !children && emptyText;
		}, [children, emptyText]);

		const typoVariant = useMemo(() => {
			return useEmptyText ? "body1" : "body1";
		}, [useEmptyText]);

		const body = useMemo(
			() => children || emptyText,
			[children, emptyText]
		);

		const BoxComponent = useMemo(() => {
			return flex ? FlexBox : Box;
		}, [flex]);

		const defaultBoxProps = useMemo(() => {
			return flex ? { alignItems: "center" } : {};
		}, [flex]);

		return (
			<Tooltip title={title} arrow={arrow}>
				<BoxComponent ref={ref} {...defaultBoxProps} sx={[
					{},
					_labelStyles,
					...(Array.isArray(sx) ? sx : [sx]),
				]}>
					{label && (
						<FormLabelEx
							{...labelProps}
						>
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
										marginTop: theme.spacing(-0.5),
										fontWeight: 400,
										marginLeft: theme.spacing(
											flex ? 1 : 0.5
										),
										...(!useEmptyText && {
											color: theme.palette.primary
												.main,
										}),
									}),
									...(Array.isArray(typographySx)
										? typographySx
										: [typographySx]),
								]}>
								{s}
							</Typography>
						))
						: body}
				</BoxComponent>
			</Tooltip>
		);
	})
);

FormFieldLabel.displayName = "FormFieldLabel";
FormFieldLabel.propTypes = {
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	children: PropTypes.node,
	labelProps: PropTypes.object,
	labelStyles: PropTypes.object,
	emptyText: PropTypes.string,
	title: PropTypes.string,
	arrow: PropTypes.bool,
	typographySx: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	flex: PropTypes.bool,
	noWrap: PropTypes.bool
};

export default FormFieldLabel;
