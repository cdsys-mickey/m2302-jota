import { alpha } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useMemo } from "react";

const makeBorder = ({
	borderStyle,
	borderRadius,
	borderTopLeftRadius,
	borderTopRightRadius,
	borderBottomLeftRadius,
	borderBottomRightRadius,
	withHeader,
}) => ({
	border: borderStyle,
	borderTopLeftRadius: withHeader ? 0 : borderTopLeftRadius || borderRadius,
	borderTopRightRadius: withHeader ? 0 : borderTopRightRadius || borderRadius,
	borderBottomLeftRadius: borderBottomLeftRadius || borderRadius,
	borderBottomRightRadius: borderBottomRightRadius || borderRadius,
});

const makeTrack = ({ hide, trackColor, borderRadius, alwaysShowTrack }) => ({
	"&::-webkit-scrollbar-track": {
		borderRadius: borderRadius,
		...((!alwaysShowTrack || hide) && {
			opacity: 0,
			backgroundColor: "tranparent",
		}),
		...(alwaysShowTrack && {
			opacity: 1,
			backgroundColor: alpha(trackColor, 0.5),
		}),
		...(!hide && {
			"&:hover": {
				backgroundColor: alpha(trackColor, 0.7),
			},
		}),
	},
});

const makeThumb = ({
	alwaysShowThumb = false,
	thumbColor,
	borderRadius,
	borderBottomLeftRadius,
	borderBottomRightRadius,
	borderTopLeftRadius,
	borderTopRightRadius,
	withHeader,
}) => ({
	"&::-webkit-scrollbar-thumb": {
		...(!alwaysShowThumb && { opacity: 0 }),
		...(alwaysShowThumb && { backgroundColor: alpha(thumbColor, 0.7) }),
		// ...(alwaysShowThumb && { opacity: 0 }),
		borderTopLeftRadius: withHeader
			? 0
			: borderTopLeftRadius || borderRadius,
		borderTopRightRadius: withHeader
			? 0
			: borderTopRightRadius || borderRadius,
		borderBottomLeftRadius: borderBottomLeftRadius || borderRadius,
		borderBottomRightRadius: borderBottomRightRadius || borderRadius,
	},
});

const makeScroller = ({
	height,
	// maxHeight,
	borderRadius,
	borderTopLeftRadius,
	borderTopRightRadius,
	borderBottomLeftRadius,
	borderBottomRightRadius,
	// SCROLLER
	scrollerWidth = "8px",
	scrollerBackgroundColor,
	// SCROLLER THUMB
	thumbColor,
	trackColor,
	alwaysShowTrack,
	alwaysShowThumb,
	withHeader,
	//Global
	hide,
}) => ({
	"&::-webkit-scrollbar": {
		transition: "background-color 1s ease-in-out",
		width: scrollerWidth,
		...(scrollerBackgroundColor && {
			backgroundColor: scrollerBackgroundColor,
		}),
		...(hide && {
			backgroundColor: "transparent",
			width: 0,
		}),
		borderTopLeftRadius: withHeader
			? 0
			: borderTopLeftRadius || borderRadius,
		borderTopRightRadius: withHeader
			? 0
			: borderTopRightRadius || borderRadius,
		borderBottomLeftRadius: borderBottomLeftRadius || borderRadius,
		borderBottomRightRadius: borderBottomRightRadius || borderRadius,
	},
	// ...(alwaysShowTrack &&
	// 	makeTrack({
	// 		trackColor,
	// 		withHeader,
	// 	})),
	...makeTrack({
		hide,
		borderRadius,
		alwaysShowTrack,
		trackColor,
		withHeader,
	}),
	// ...(alwaysShowThumb &&
	// 	makeThumb({
	// 		alwaysShowThumb,
	// 		thumbColor,
	// 		borderRadius,
	// 		borderBottomLeftRadius,
	// 		borderBottomRightRadius,
	// 		borderTopLeftRadius,
	// 		borderTopRightRadius,
	// 		withHeader,
	// 	})),
	...makeThumb({
		alwaysShowThumb,
		thumbColor,
		borderRadius,
		borderBottomLeftRadius,
		borderBottomRightRadius,
		borderTopLeftRadius,
		borderTopRightRadius,
		withHeader,
	}),
	"&:hover": {
		// ...makeTrack({ trackColor }),

		...(!hide && {
			"&::-webkit-scrollbar-thumb": {
				opacity: 1,
				backgroundColor: alpha(thumbColor, 0.9),
			},
		}),
		...(!hide && {
			"&::-webkit-scrollbar-track": {
				opacity: 1,
				backgroundColor: alpha(trackColor, 0.7),
			},
		}),

		// ...makeThumb({
		// 	thumbColor,
		// 	borderRadius,
		// 	borderBottomLeftRadius,
		// 	borderBottomRightRadius,
		// 	borderTopLeftRadius,
		// 	borderTopRightRadius,
		// 	withHeader,
		// }),
	},
	...(height && { height }),
	overflowY: "auto",
	overflowX: "hidden",
});

const makeBody = () => ({
	flexGrow: 1,
});

export const useScrollable = (props = {}) => {
	const {
		height = 500,
		// maxHeight,
		// BORDER
		borderStyle = "1px solid #e0e0e0",
		borderRadius = "4px",
		borderTopLeftRadius = "4px",
		borderTopRightRadius = "4px",
		borderBottomLeftRadius = "4px",
		borderBottomRightRadius = "4px",
		// SCROLLER
		scrollerWidth = "8px",
		scrollerBackgroundColor = "rgba(0, 0, 0, .02)",
		// TRACK
		alwaysShowTrack = false,
		trackColor = grey[300],
		// THUMB
		thumbColor = grey[500],
		alwaysShowThumb = false,
		withHeader = false,
		// Global
		hide = false,
	} = props;

	const styles = useMemo(
		() => ({
			border: makeBorder({
				borderStyle,
				borderRadius,
				borderTopLeftRadius,
				borderTopRightRadius,
				borderBottomLeftRadius,
				borderBottomRightRadius,
				withHeader,
			}),
			scroller: makeScroller({
				hide,
				height,
				// maxHeight,
				borderRadius,
				borderTopLeftRadius,
				borderTopRightRadius,
				borderBottomLeftRadius,
				borderBottomRightRadius,
				// SCROLLER
				scrollerWidth,
				scrollerBackgroundColor,
				// SCROLLER THUMB
				thumbColor,
				trackColor,
				alwaysShowTrack,
				alwaysShowThumb,
				withHeader,
			}),
			body: makeBody({}),
		}),
		[
			alwaysShowThumb,
			alwaysShowTrack,
			borderBottomLeftRadius,
			borderBottomRightRadius,
			borderRadius,
			borderStyle,
			borderTopLeftRadius,
			borderTopRightRadius,
			height,
			scrollerBackgroundColor,
			scrollerWidth,
			hide,
			thumbColor,
			trackColor,
			withHeader,
		]
	);
	return {
		...styles,
	};
};
