import React from "react";
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
	ToolbarPlaceHolder: {},
	toolbar: theme.mixins.toolbar,
	toolbarDense: {
		height: theme.spacing(6),
	},
}));

const ToolbarPlaceHolder = (props) => {
	const { dense, ...rest } = props;
	const classes = useStyles();
	return <div className={dense ? classes.toolbarDense : classes.toolbar} />;
};

export default ToolbarPlaceHolder;
