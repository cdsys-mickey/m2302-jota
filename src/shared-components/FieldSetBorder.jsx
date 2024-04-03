import { Box, FormHelperText } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";
import React from "react";
import { useScrollable } from "@/shared-hooks/useScrollable";

const useStyles = makeStyles((theme) => ({
	FieldSetBorder: (props) => ({
		borderRadius: theme.spacing(0.5),
		border: props.error ? "2px solid rgb(244 67 54)" : "1px solid #c4c4c4",
		paddingTop: 0,
		paddingBottom: theme.spacing(1),
		height: props.height,
		minHeight: props.minHeight,
		"& legend": {
			fontSize: theme.spacing(2),
			color: props.error ? "rgb(244 67 54)" : "#848181",
			paddingLeft: "5px",
		},
	}),
	legend: {},
}));

const FieldSetBorder = (props) => {
	const {
		children,
		legend = "(legend 未指定)",
		className,
		fieldSetClass,
		legendClassName,
		useInputLabelStyle = false,
		height,
		minHeight = 60,
		error,
		helperText,
		...rest
	} = props;
	const classes = useStyles({
		useInputLabelStyle,
		height,
		error,
		minHeight,
	});
	const { scrollable } = useScrollable({
		height,
	});

	return (
		<>
			<Box
				component="fieldset"
				className={clsx(classes.FieldSetBorder, className, {
					[scrollable.scroller]: height,
				})}
				{...rest}>
				{legend && (
					<legend
						className={
							useInputLabelStyle
								? clsx(
										"MuiFormLabel-root",
										"MuiInputLabel-shrink",
										classes.legend
										// eslint-disable-next-line no-mixed-spaces-and-tabs
								  )
								: legendClassName
						}>
						{legend}
					</legend>
				)}
				{children}
			</Box>
			{helperText && <FormHelperText error>{helperText}</FormHelperText>}
		</>
	);
};

export default FieldSetBorder;
