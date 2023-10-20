import { amber } from "@mui/material/colors";

const getColorButton = (theme, mainTone = amber) => ({
	"&": {
		color: theme.palette.getContrastText(mainTone[300]),
		backgroundColor: mainTone[300],
		"&:hover": {
			backgroundColor: mainTone[500],
		},
	},
});

const ButtonStyles = {
	getColorButton,
};

export default ButtonStyles;
