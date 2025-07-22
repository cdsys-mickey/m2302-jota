/* eslint-disable no-mixed-spaces-and-tabs */
import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef, memo, useMemo } from "react";
import MuiStyles from "../../shared-modules/MuiStyles";
import FlexBox from "../FlexBox";
import { FormLabelEx } from "@/shared-components";
import Types from "@/shared-modules/Types.mjs";
import Forms from "@/shared-modules/Forms.mjs";
import { Fragment } from "react";

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
			dense = true,
		} = props;

		const _labelStyles = useMemo(() => {
			return labelStyles || (noWrap ? MuiStyles.FORM_LABEL_STYLES_NOWRAP : MuiStyles.DEFAULT_FORM_LABEL_STYLES)
		}, [labelStyles, noWrap]);

		const body = useMemo(() => {
			if (children != null) {
				return (Types.isLiteral(children) ? Forms.formatLiteral(children) : children) || emptyText;
			}
			return (stringify ? stringify(value) : (Types.isLiteral(value) ? Forms.formatLiteral(value) : value) || emptyText);
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
			<BoxComponent className={FormFieldLabelView.displayName} ref={ref} inline={inline} {...defaultBoxProps} {...slotProps?.box} sx={[
				(theme) => ({
					...(flex && {
						alignItems: "center"
					}),
					marginLeft: theme.spacing(0.5),
				}),
				_labelStyles,
				...(Array.isArray(sx) ? sx : [sx]),
			]}>
				{label && (
					<FormLabelEx
						dense={dense}
						{...labelProps}
						{...slotProps?.label}
					>
						{label}
					</FormLabelEx>
				)}
				<Box className="FormFieldLabelView-bodybox" sx={{
					...(dense && {
						position: "relative",
						// ...(label && { // dense 時若有 label 才往上移 8px
						// 	marginTop: "-8px"
						// })
					})
				}} {...slotProps?.value} {...(isNegative && slotProps?.negativeValue)}>
					{Types.isLiteral(body) ? <>
						<Typography
							color="primary"
							variant="body1"
							sx={[
								(theme) => ({
									fontWeight: 400,
									...(isEmpty && {
										color: theme.palette.text.disabled,
									}),
								}),
								...(Array.isArray(typographySx)
									? typographySx
									: [typographySx]),
							]}>
							{body
								?.split('\n')
								.map((line, index) => (
									<Fragment key={`${line}_${index}`}>
										{line}
										{index < body.split('\n').length - 1 && <br />}
									</Fragment>
								))}
						</Typography>
					</>
						: body}
				</Box>

			</BoxComponent >

		);
	})
);

FormFieldLabelView.displayName = "FormFieldLabelView";
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
	dense: PropTypes.bool
};

export default FormFieldLabelView;
