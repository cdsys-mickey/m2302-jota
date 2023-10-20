import { Box } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import clsx from "clsx";
import React from "react";

const useStyles = makeStyles((theme) => ({
	InlineContainer: (props) => ({
		display: "inline-flex",
		justifyContent: props.justifyContent,
		alignItems: props.alignItems,
		width: props.fullWidth ? "100%" : "",
	}),
}));

const ZZInlineContainer = (props) => {
	const {
		className,
		children,
		alignItems = "center",
		justifyContent = "flex-start",
		fullWidth = false,
		...rest
	} = props;
	const classes = useStyles({
		alignItems,
		justifyContent,
		fullWidth,
	});

	return (
		<Box className={clsx(classes.InlineContainer, className)} {...rest}>
			{children}
		</Box>
	);
};

export default ZZInlineContainer;
