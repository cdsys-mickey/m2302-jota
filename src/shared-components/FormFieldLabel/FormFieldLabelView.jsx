/* eslint-disable no-mixed-spaces-and-tabs */
import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef, memo, useMemo } from "react";
import MuiStyles from "../../shared-modules/MuiStyles";
import FlexBox from "../FlexBox";
import { FormLabelEx } from "@/shared-components";
import Types from "@/shared-modules/Types.mjs";
import Forms from "@/shared-modules/Forms.mjs";

/**
 * 增加 label 功能的 Typography
 */
const FormFieldLabelView = memo(
	forwardRef((props, ref) => {
		const {
			// name,
			label,
			children,
			labelProps,
			labelStyles,
			typographySx,
			emptyText = "(空白)",
			sx = [],
			flex = false,
			stringify,
			inline = false,
			value,
			slotProps,
			noWrap = false,
			// isEmpty = false,
			isNegative = false,
			...rest
		} = props;

		const _labelStyles = useMemo(() => {
			return labelStyles || (noWrap ? MuiStyles.FORM_LABEL_STYLES_NOWRAP : MuiStyles.DEFAULT_FORM_LABEL_STYLES)
		}, [labelStyles, noWrap]);

		const body = useMemo(() => {
			if (children != null) {
				return (Types.isLiteral(children) ? Forms.formatLiteral(children) : children) || emptyText;
			}
			return (stringify ? stringify(value) : (Types.isLiteral(children) ? Forms.formatLiteral(children) : children) || emptyText);
		}, [children, emptyText, stringify, value]);

		const BoxComponent = useMemo(() => {
			return inline || flex ? FlexBox : Box;
		}, [flex, inline]);

		const defaultBoxProps = useMemo(() => {
			return inline ? { alignItems: "center" } : {};
		}, [inline]);

		const isEmpty = useMemo(() => {
			const result = (
				(value == null || value === "" || (Array.isArray(value) && value.length == 0))
				&& (children == null || children === "")

			);
			return result;
		}, [children, value]);

		return (
			<BoxComponent ref={ref} inline={inline} {...defaultBoxProps} {...slotProps?.box} sx={[
				(theme) => ({
					...(flex && {
						alignItems: "center"
					}),
					marginTop: theme.spacing(-1),
					marginLeft: theme.spacing(0.5)
				}),
				_labelStyles,
				...(Array.isArray(sx) ? sx : [sx]),
			]}>
				{label && (
					<FormLabelEx
						{...labelProps}
						{...slotProps?.label}
					>
						{label}
					</FormLabelEx>
				)}
				{Types.isLiteral(body) ? <Box {...slotProps?.value} {...(isNegative && slotProps?.negativeValue)}>
					{body?.split("\n").map((s, index) => (
						<Typography
							key={`${s}_${index}`}
							color="text.secondary"
							variant="body1"
							sx={[
								(theme) => ({
									fontWeight: 400,
									...(!isEmpty && {
										color: theme.palette.primary.main,
									}),
								}),
								...(Array.isArray(typographySx)
									? typographySx
									: [typographySx]),
							]}>
							{s}
						</Typography>
					))}
				</Box> : body}

			</BoxComponent>

		);
	})
);

FormFieldLabelView.displayName = "FormFieldLabel";
FormFieldLabelView.propTypes = {
	name: PropTypes.string,
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
	labelProps: PropTypes.object,
	labelStyles: PropTypes.object,
	emptyText: PropTypes.string,
	title: PropTypes.string,
	arrow: PropTypes.bool,
	typographySx: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	flex: PropTypes.bool,
	noWrap: PropTypes.bool,
	inline: PropTypes.bool,
	stringify: PropTypes.func,
	slotProps: PropTypes.object,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
	format: PropTypes.func,
	isNegative: PropTypes.bool,
	isEmpty: PropTypes.bool,
};

export default FormFieldLabelView;
