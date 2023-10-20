import { blue } from "@mui/material/colors";
import { Box } from "@mui/system";
import { memo, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import useScrollable from "@/shared-hooks/useScrollable";
import { Paper } from "@mui/material";

const LinkRenderer = ({ children, href }) => {
	return (
		<a href={href} target="_blank" rel="noreferrer">
			{children}
		</a>
	);
};

const BulletinWidget = memo((props) => {
	const {
		height = 500,
		heading,
		icon,
		cssColor,
		sx = [],
		children,
		...rest
	} = props;
	const styles = useMemo(
		() => ({
			"& a:link, & a:visited": {
				textDecoration: "none",
				color: blue[500],
			},
			"& a:hover": {
				textDecoration: "underline",
			},
			"& ul": {
				listStyle: "none",
			},
			"& ul li::before": {
				content: '"\u{26A1}"',
				display: "inline-block",
				width: "1em",
				marginLeft: "-2em",
				paddingRight: "2em",
			},
			"& ul li": {
				marginBottom: "0.5em",
			},
		}),
		[]
	);

	const scrollable = useScrollable({
		height,
		scrollerBackgroundColor: "transparent",
	});
	return (
		<Box sx={[...(Array.isArray(sx) ? sx : [sx])]}>
			{heading}
			<Box mt={1}>
				<Paper sx={[scrollable.scroller, {}]}>
					<Box sx={[scrollable.body, styles]}>
						<ReactMarkdown components={{ a: LinkRenderer }}>
							{children}
						</ReactMarkdown>
					</Box>
				</Paper>
			</Box>
		</Box>
	);
});

BulletinWidget.displayName = "BulletinWidget";

export default BulletinWidget;
