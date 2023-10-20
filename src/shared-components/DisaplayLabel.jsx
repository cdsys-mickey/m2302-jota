import { Box, FormControl, FormLabel } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import React from "react";
import FlexBox from "./FlexBox";

const useStyles = makeStyles((theme) => ({
	DisplayLabel: {},
	formLabel: {},
}));

const DisplayLabel = (props) => {
	const { inline = false, name, children, labelSize, ...rest } = props;
	const classes = useStyles();
	return (
		<FormControl>
			<Box display={inline ? "inline-flex" : ""}>
				<Box>
					<FormLabel className={classes.formlabel}>{name}</FormLabel>
				</Box>
				<Box flex={1} pl={1}>
					{children}
				</Box>
			</Box>
		</FormControl>
	);
};

export default DisplayLabel;
