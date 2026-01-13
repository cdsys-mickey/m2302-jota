import ErrorBox from "@/shared-components/ErrorBox";
import LoadingTypography from "@/shared-components/LoadingTypography";
import PropTypes from "prop-types";
import { memo, useEffect, useMemo, useRef } from "react";
import { FixedSizeList, VariableSizeList } from "react-window";
import RWFrameMenuRow from "./RWFrameMenuRow";
import { forwardRef } from "react";
import "./RWFrameMenu.scss";
import clsx from "clsx";
import { useScrollable } from "../../shared-hooks/useScrollable";
import { AlertEx } from "shared-components";
import SideMenu from "@/modules/SideMenu.mjs";

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

const RWFrameMenuView = memo((props) => {
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
		dense = false
	} = props;

	const listRef = useRef(null);

	// const _itemSize = useMemo(() => {
	// 	return dense ? 26 : 34;
	// }, [dense])

	const getItemSize = (index) => {
		const value = data[index];
		if (SideMenu.isReminder(value)) {
			// console.log("isReminder", value);
			return 66; // 假設 Reminder 高度
		}
		if (SideMenu.isHeader(value)) {
			// console.log("isHeader", value);
			return 34; // 假設 Header 高度
		}
		// console.log("isOther", value);
		return dense ? 26 : 34; // 一般項目高度
	};

	// 3. 當資料或 dense 改變時，清除高度快取
	useEffect(() => {
		if (listRef.current) {
			listRef.current.resetAfterIndex(0);
		}
	}, [data, dense]);

	if (loading) {
		return <LoadingTypography>讀取中...</LoadingTypography>;
	}

	if (error) {
		return <ErrorBox error={error} />;
	}



	return (
		<div
			className={clsx("rw-shadow", {
				// "rw-top-shadow": scrollOffset > 0,
				"rw-bottom-shadow": !bottomReached,
			})}
		// style={scrollable.scroller}
		>
			<VariableSizeList
				ref={listRef}
				onScroll={onScroll}
				className={clsx("rw-scrollable", {
					"rw-top-shadow": scrollOffset > 0,
				})}
				height={height}
				itemCount={itemCount}
				// itemSize={_itemSize}
				itemSize={getItemSize}
				itemData={data}
				width={width - 1}
				// innerElementType={innerElementType}
				onItemsRendered={onItemsRendered}>
				{RWFrameMenuRow}
			</VariableSizeList>
		</div>
	);
});
RWFrameMenuView.propTypes = {
	height: PropTypes.number,
	width: PropTypes.number,
	itemCount: PropTypes.number,
	data: PropTypes.array,
	loading: PropTypes.bool,
	bottomReached: PropTypes.bool,
	error: PropTypes.object,
	dense: PropTypes.bool
};

RWFrameMenuView.displayName = "RWFrameMenuView";

export default RWFrameMenuView;
