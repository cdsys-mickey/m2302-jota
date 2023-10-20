import { TextField } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";
import React from "react";
import { useKeyEvent } from "@/shared-hooks/useKeyEvent";

const useStyles = makeStyles((theme) => ({
	CancellableTextField: {
		paddingTop: "3px",
	},
}));

const CancellableTextField = (props) => {
	const classes = useStyles();
	const { className, onCancel, ...rest } = props;
	useKeyEvent({ key: "Escape", callback: onCancel });

	return (
		<TextField
			className={clsx(classes.CancellableTextField, className)}
			onBlur={onCancel}
			{...rest}
		/>
	);
};

export default CancellableTextField;
