/* eslint-disable no-mixed-spaces-and-tabs */
import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef, memo, useMemo } from "react";
import { useWatch } from "react-hook-form";
import MuiStyles from "../../shared-modules/MuiStyles";
import Types from "../../shared-modules/sd-types";
import FlexBox from "../FlexBox";
import FormLabelEx from "./FormLabelEx";

/**
 * 增加 label 功能的 Typography
 */
const FormFieldLabel = memo(
	forwardRef((props, ref) => {
		const {
			name,
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
			title,
			arrow,
			slotProps,
			noWrap = false,
			...rest
		} = props;

		const value = useWatch({
			name,
		});

		const _labelStyles = useMemo(() => {
			return labelStyles || (noWrap ? MuiStyles.FORM_LABEL_STYLES_NOWRAP : MuiStyles.DEFAULT_FORM_LABEL_STYLES)
		}, [labelStyles, noWrap]);

		// 加入陣列空白判斷
		const useEmptyText = useMemo(() => {
			return (name ? (!value || (Array.isArray(value) && value.length == 0)) : !children) && !!emptyText;
		}, [children, emptyText, name, value]);

		const typoVariant = useMemo(() => {
			return useEmptyText ? "body1" : "body1";
		}, [useEmptyText]);

		const body = useMemo(
			() => (name ? (stringify ? stringify(value) : value) : (stringify ? stringify(children) : children)) || emptyText,
			[children, emptyText, name, stringify, value]
		);

		const BoxComponent = useMemo(() => {
			return inline || flex ? FlexBox : Box;
		}, [flex, inline]);

		const defaultBoxProps = useMemo(() => {
			return inline ? { alignItems: "center" } : {};
		}, [inline]);

		return (
			<BoxComponent ref={ref} inline={inline} {...defaultBoxProps} {...slotProps?.box} sx={[
				{
					...(flex && {
						alignItems: "center"
					})
				},
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
									// marginTop: theme.spacing(-0.5),
									fontWeight: 400,
									// marginLeft: theme.spacing(
									// 	inline ? 1 : 0.5
									// ),
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

		);
	})
);

FormFieldLabel.displayName = "FormFieldLabel";
FormFieldLabel.propTypes = {
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
	slotProps: PropTypes.object
};

export default FormFieldLabel;
