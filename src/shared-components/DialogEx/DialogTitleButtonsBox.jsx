import { FlexBox } from "shared-components";
import { styled } from "@mui/system";

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
		// "& button:not(.MuiButtonGroup-root *), & label, & .button": {
		// 	marginLeft: theme.spacing(0.5),
		// },

		display: 'flex', // Ensure the parent is a flex container for gap to work
		gap: theme.spacing(1), // Use gap instead of marginLeft

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
