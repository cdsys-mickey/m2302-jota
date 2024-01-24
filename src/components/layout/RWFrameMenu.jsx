import ErrorBox from "@/shared-components/ErrorBox";
import LoadingTypography from "@/shared-components/LoadingTypography";
import PropTypes from "prop-types";
import { memo } from "react";
import { FixedSizeList as List } from "react-window";
import RWFrameMenuRow from "./RWFrameMenuRow";
import { forwardRef } from "react";
import "./RWFrameMenu.scss";
import clsx from "clsx";
import { useScrollable } from "../../shared-hooks/useScrollable";

const PADDING_SIZE = 8;

// eslint-disable-next-line react/display-name
const innerElementType = forwardRef(({ style, ...rest }, ref) => (
	<div
		ref={ref}
		style={{
			...style,
			height: `${parseFloat(style.height) + PADDING_SIZE * 2}px`,
		}}
		{...rest}
	/>
));

const RWFrameMenu = memo((props) => {
	const {
		height = 300,
		width = 260,
		data,
		loading,
		error,
		itemCount,
		bottomReached,
		scrollOffset,
		onScroll,
		onItemsRendered,
	} = props;

	if (loading) {
		return <LoadingTypography>讀取中...</LoadingTypography>;
	}

	if (error) {
		return <ErrorBox error={error} />;
	}

	// console.log("styles:", styles);

	return (
		<div
			className={clsx("rw-shadow", {
				// "rw-top-shadow": scrollOffset > 0,
				"rw-bottom-shadow": !bottomReached,
			})}
			// style={scrollable.scroller}
		>
			<List
				onScroll={onScroll}
				className={clsx("rw-scrollable", {
					"rw-top-shadow": scrollOffset > 0,
				})}
				height={height}
				itemCount={itemCount}
				itemSize={34}
				itemData={data}
				width={width - 1}
				// innerElementType={innerElementType}
				onItemsRendered={onItemsRendered}>
				{RWFrameMenuRow}
			</List>
		</div>
	);
});
RWFrameMenu.propTypes = {
	height: PropTypes.number,
	width: PropTypes.number,
	itemCount: PropTypes.number,
	data: PropTypes.array,
	loading: PropTypes.bool,
	error: PropTypes.object,
};

RWFrameMenu.displayName = "RWFrameMenu";

export default RWFrameMenu;
