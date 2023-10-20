import { Box } from "@mui/material";
import clsx from "clsx";
import useScrollable from "hooks/useScrollable";

const ScrollableBox = ({
	height,
	showHeader,
	children,
	className,
	...rest
}) => {
	const { scrollable } = useScrollable({ height, showHeader });
	return (
		<Box
			className={clsx(scrollable.scroller, scrollable.border, className)}
			{...rest}>
			<Box className={scrollable.body}>{children}</Box>
		</Box>
	);
};

export default ScrollableBox;
