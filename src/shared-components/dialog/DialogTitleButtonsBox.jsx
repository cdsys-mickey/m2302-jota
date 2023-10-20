import { Box, styled } from "@mui/system";
import { grey } from "@mui/material/colors";
import FlexBox from "@/shared-components/FlexBox";

const DialogTitleButtonsBox = styled(FlexBox)(
	({
		theme,
		// disabled = false,
		// hoverStyles = {
		// 	backgroundColor: grey[200],
		// 	boxShadow: "1px 2px 3px rgb(0 0 0 / 20%)",
		// },
	}) => ({
		position: "relative",
		"& button": {
			// marginLeft: theme.spacing(1),
		},
		// padding: theme.spacing(1),
		// paddingBottom: 0,

		// "&:hover": {
		// 	...(!disabled && {
		// 		//default hover styles
		// 		...hoverStyles,
		// 	}),
		// },
		// ...(disabled && {
		// 	//default disabled styles
		// 	...disabledStyles,
		// }),
		// cursor: "pointer",
		// "& .secondary-action": {
		// 	// opacity: 0,
		// 	transition: theme.transitions.create("opacity", {
		// 		easing: theme.transitions.easing.sharp,
		// 		duration: theme.transitions.duration.leavingScreen,
		// 	}),
		// },
		// "&:hover .secondary-action": {
		// 	opacity: "100%",
		// },
		// ...{
		// 	backgroundColor: grey[200],
		// 	boxShadow: "1px 2px 3px rgb(0 0 0 / 20%)",
		// },
	})
);

export default DialogTitleButtonsBox;
