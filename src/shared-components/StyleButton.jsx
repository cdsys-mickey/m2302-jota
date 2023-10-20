import { Button } from "@mui/material";

import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
	StyleButton: (props) => ({
		background: theme.background,
		border: 0,
		fontSize: props.fontSize,
		borderRadius: props.borderRadius,
		boxShadow: theme.boxShadow,
		color: props.color,
		height: props.height,
		padding: props.padding,
		"&:hover": {
			background: theme.hoverBackground || theme.background,
		},
	}),
}));

/**
 * 搭配 ThemeProvider 使用的樣式化按鈕, 使用格式如下
 * <ThemeProvider
 * 	theme={{
 * 		background:
 * 			"linear-gradient(104deg, rgb(37 214 255 / 86%) 19%, rgb(44, 139, 221) 90%)",
 * 		boxShadow:
 * 			"rgb(105 144 255 / 30%) 0px 3px 5px 2px",
 * 	}}>
 * 	<StyleButton
 *		...
 * @param {*} props
 * @returns
 */
export const StyleButton = (props) => {
	const {
		fontSize = 14,
		height = "36px",
		padding = "0 16px",
		color = "white",
		borderRadius = 4,
		...rest
	} = props;
	const classes = useStyles({
		fontSize,
		height,
		padding,
		color,
		borderRadius,
	});
	return <Button className={classes.StyleButton} {...rest} />;
};

export default StyleButton;
