import { Box, styled } from "@mui/material";


const DateFieldBox = styled(Box, {
	shouldForwardProp: (prop) => !["hideBorders", "hideControls"].includes(prop)
})(({ hideBorders, hideControls }) => ({
	...(hideBorders && {
		"& fieldset": { border: "none" },
	}),
	...(hideControls && {
		pointerEvents: "none",
	}),
}));

export default DateFieldBox;