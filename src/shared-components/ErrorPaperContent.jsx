import React from "react";
import { Typography, Grid, Box } from "@mui/material";

import makeStyles from '@mui/styles/makeStyles';

import ErrorIcon from "@mui/icons-material/Error";
import ModuleHeading from "./ModuleHeading";

const useStyles = makeStyles((theme) => ({
	ErrorPaperContent: {},
	stacktraceContainer: {
		paddingLeft: "1rem",
	},
	stacktrace: {
		fontSize: "12px",
		whiteSpace: "pre-line",
	},
	title: {
		color: theme.palette.text.secondary,
		fontWeight: "bolder",
	},
	messageContainer: {
		paddingLeft: "1rem",
		paddingRight: "1rem",
	},
	subtitle: {},
}));

const ErrorPaperContent = ({
	title = "發生例外狀況",
	status,
	message,
	stack,
	style,
	variant = "h5",
	...rest
}) => {
	const classes = useStyles();
	return (
		<Box className={classes.ErrorPaperContent} {...rest}>
			<Grid container>
				<Grid item xs={12}>
					<ModuleHeading
						text={title}
						icon={
							<ErrorIcon
								fontSize="large"
								style={{ color: "red" }}
							/>
						}
					/>
				</Grid>

				{status && (
					<Grid item xs={12}>
						<Typography
							variant="h6"
							className={classes.subtitle}
							color="textSecondary">
							錯誤代碼: {status}
						</Typography>
					</Grid>
				)}

				{message && (
					<Grid item xs={12} className={classes.messageContainer}>
						<Typography
							variant="h6"
							className={classes.subtitle}
							color="textSecondary">
							{message}
						</Typography>
					</Grid>
				)}

				{stack && (
					<>
						<Grid item xs={12}>
							<Typography
								variant="h6"
								className={classes.subtitle}
								color="textSecondary">
								錯誤堆疊:
							</Typography>
						</Grid>
						<Grid
							item
							xs={12}
							className={classes.stacktraceContainer}>
							<Typography
								variant="body1"
								color="textSecondary"
								className={classes.stacktrace}>
								{stack}
							</Typography>
						</Grid>
					</>
				)}
			</Grid>
		</Box>
	);
};

export default React.memo(ErrorPaperContent);
