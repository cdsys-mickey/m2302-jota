import { Dialog, DialogContent, IconButton } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";
import React from "react";
import DialogTitleEx from "./DialogTitleEx";
import CloseIcon from "@mui/icons-material/Close";

const useStyles = makeStyles((theme) => ({
	InfoDialog: (props) => ({
		// width: "20rem",
		"& ::-webkit-scrollbar": {
			width: "8px",
			backgroundColor: "rgba(0, 0, 0, .03)",
		},
		"& ::-webkit-scrollbar-thumb": {
			borderBottomLeftRadius: "4px",
			borderBottomRightRadius: "4px",
			borderTopLeftRadius: props.showHeader ? 0 : "4px",
			borderTopRightRadius: props.showHeader ? 0 : "4px",
			backgroundColor: "rgba(0, 0, 0, .2)",
		},
		"& .MuiDialog-paper": {
			minWidth: props.minWidth,
		},
		"& .MuiDialogContentText-root": {
			paddingLeft: theme.spacing(3),
			paddingRight: theme.spacing(3),
		},
	}),
	title: {
		display: "flex",
		padding: "8px 8px",
	},
	buttons: {
		display: "flex",
		flex: 1,
		justifyContent: "flex-end",
		alignItems: "baseline",
		"& button": {
			marginLeft: theme.spacing(1),
		},
	},
	button: {
		// color: theme.palette.grey[500],
		color: "#fff",
	},
}));

const InfoDialog = (props) => {
	const {
		className,
		children,
		title,
		actions,
		onClose,
		minWidth = "24rem",
		minHeight,
		...rest
	} = props;
	const classes = useStyles({
		minWidth,
		minHeight,
	});
	return (
		<Dialog
			className={clsx(classes.InfoDialog, className)}
			onClose={onClose}
			{...rest}>
			{/* <InfoDialogTitle onClose={onClose} title={title} /> */}
			{title && <DialogTitleEx onClose={onClose} title={title} />}
			{!title && onClose && (
				<IconButton
					size="small"
					disableRipple
					aria-label="close"
					onClick={onClose}
					sx={{
						position: "absolute",
						right: 8,
						top: 8,
						color: (theme) => theme.palette.grey[500],
					}}>
					<CloseIcon />
				</IconButton>
			)}

			<DialogContent sx={{ padding: "0 24px 24px" }}>
				{children}
			</DialogContent>
			{actions}
		</Dialog>
	);
};

export default InfoDialog;

// export const InfoDialogTitle = (props) => {
// 	const { title, onClose, className, typographyProps } = props;
// 	const classes = useStyles();
// 	return (
// 		<DialogTitle
// 			disableTypography
// 			className={clsx(classes.title, className)}>
// 			<Typography variant="h5" {...typographyProps}>
// 				{title}
// 			</Typography>
// 			<Box className={classes.buttons}>
// 				<IconButton
// 					size="small"
// 					aria-label="close"
// 					className={classes.button}
// 					onClick={onClose}>
// 					<CloseIcon />
// 				</IconButton>
// 			</Box>
// 		</DialogTitle>
// 	);
// };
