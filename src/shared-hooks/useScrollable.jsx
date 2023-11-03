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

const makeTrack = ({ trackColor }) => ({
	"&::-webkit-scrollbar-track": {
		backgroundColor: trackColor || "transparent",
		"&:hover": {
			backgroundColor: "rgba(0, 0, 0, .04)",
		},
	},
});

const makeThumb = ({
	thumbColor,
	borderRadius,
	borderBottomLeftRadius,
	borderBottomRightRadius,
	borderTopLeftRadius,
	borderTopRightRadius,
	withHeader,
}) => ({
	"&::-webkit-scrollbar-thumb": {
		borderTopLeftRadius: withHeader
			? 0
			: borderTopLeftRadius || borderRadius,
		borderTopRightRadius: withHeader
			? 0
			: borderTopRightRadius || borderRadius,
		borderBottomLeftRadius: borderBottomLeftRadius || borderRadius,
		borderBottomRightRadius: borderBottomRightRadius || borderRadius,
		backgroundColor: thumbColor,
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
	// scrollerWidth,
	scrollerBackgroundColor,
	// SCROLLER THUMB
	thumbColor,
	trackColor,
	alwaysShowTrack,
	alwaysShowThumb,
	withHeader,
}) => ({
	"&::-webkit-scrollbar": {
		width: "8px",
		backgroundColor: scrollerBackgroundColor,
		borderTopLeftRadius: withHeader
			? 0
			: borderTopLeftRadius || borderRadius,
		borderTopRightRadius: withHeader
			? 0
			: borderTopRightRadius || borderRadius,
		borderBottomLeftRadius: borderBottomLeftRadius || borderRadius,
		borderBottomRightRadius: borderBottomRightRadius || borderRadius,
	},
	...(alwaysShowTrack &&
		makeTrack({
			trackColor,
			withHeader,
		})),
	...(alwaysShowThumb &&
		makeThumb({
			thumbColor,
			borderRadius,
			borderBottomLeftRadius,
			borderBottomRightRadius,
			borderTopLeftRadius,
			borderTopRightRadius,
			withHeader,
		})),
	"&:hover": {
		...makeTrack({ trackColor }),
		...makeThumb({
			thumbColor,
			borderRadius,
			borderBottomLeftRadius,
			borderBottomRightRadius,
			borderTopLeftRadius,
			borderTopRightRadius,
			withHeader,
		}),
	},
	height: height,
	// maxHeight: maxHeight,
	overflowY: "auto",
	overflowX: "hidden",
});

const makeBody = () => ({
	flexGrow: 1,
});

export const useScrollable = (props) => {
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
		scrollerBackgroundColor = "rgba(0, 0, 0, .05)",
		// SCROLLER THUMB
		thumbColor = "rgba(0, 0, 0, .2)",
		trackColor = "rgba(0, 0, 0, .03)",
		alwaysShowTrack = false,
		alwaysShowThumb = false,
		withHeader = false,
	} = props ? props : {};

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
			thumbColor,
			trackColor,
			withHeader,
		]
	);
	return {
		...styles,
	};
};
