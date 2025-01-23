import { List } from "@mui/material";
import { Box } from "@mui/system";
import React, { useMemo } from "react";
import ErrorBox from "@/shared-components/ErrorBox";
import LoadingTypography from "@/shared-components/LoadingTypography";
import NoDataBox from "@/shared-components/NoDataBox";
import { useScrollable } from "@/shared-hooks/useScrollable";
import { memo } from "react";

const useStyles = () => ({
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
});

const WidgetBox = (props) => {
	const {
		height = 500,
		children,
		heading,
		styles,
		scrollerStyles,
		bodyStyles,
		sx = [],
	} = props;
	return (
		<Box sx={[styles, ...(Array.isArray(sx) ? sx : [sx])]}>
			{heading}

			<>
				<hr />
				<List dense sx={[scrollerStyles]}>
					<Box sx={[bodyStyles]}>{children}</Box>
				</List>
			</>
		</Box>
	);
};

const HomeWidget = memo((props) => {
	const {
		height = 500,
		minHeight,
		loading,
		error,
		heading,
		icon,
		cssColor,
		sx = [],
		data = [],
		// handleItemSelect,
		ItemComponent,
		...rest
	} = props;
	const styles = useStyles();
	const scrollable = useScrollable({
		height,
		minHeight,
		scrollerBackgroundColor: "transparent",
	});

	const isDataEmpty = useMemo(() => {
		return !loading && data && data.length === 0;
	}, [data, loading]);

	const hasData = useMemo(() => {
		return !loading && data && data.length > 0;
	}, [data, loading]);

	if (error) {
		return (
			<WidgetBox
				heading={heading}
				styles={styles}
				scrollerStyles={scrollable.scroller}
				bodyStyles={scrollable.body}>
				<ErrorBox error={error} />
			</WidgetBox>
		);
	}

	if (loading) {
		return (
			<WidgetBox
				heading={heading}
				styles={styles}
				scrollerStyles={scrollable.scroller}
				bodyStyles={scrollable.body}
			>
				<LoadingTypography>讀取中...</LoadingTypography>
			</WidgetBox>
		);
	}

	return (
		<WidgetBox heading={heading} styles={styles} scrollerStyles={scrollable.scroller}
			bodyStyles={scrollable.body}>
			{isDataEmpty && <NoDataBox />}
			{hasData &&
				data.map((item, index) => (
					<ItemComponent key={`item_${index}`} value={item} />
				))}
		</WidgetBox>
	);
});

HomeWidget.displayName = "HomeWidget";
export default HomeWidget;
