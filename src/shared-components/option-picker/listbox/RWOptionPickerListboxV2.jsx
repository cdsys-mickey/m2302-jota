import { Box, ListSubheader, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import PropTypes from "prop-types";
import { forwardRef, memo, useCallback, useEffect, useMemo, useRef } from "react";
import { VariableSizeList } from "react-window";
import { RWOuterElementContext } from "./RWOuterElementContext";
import RWOuterElementType from "./RWOuterElementType";
import OptionPickerContext from "../OptionPickerContext";
import { useContext } from "react";
import InfiniteLoader from "react-window-infinite-loader";
import ConsoleStyles from "@/shared-modules/ConsoleStyles.mjs";

const LISTBOX_PADDING = 8; // px
const ITEM_HEIGHT_MOBILE = 48;
const ITEM_HEIGHT_DESKTOP = 36;

const useResetCache = (data) => {
	console.log("%citemData.length changed", ConsoleStyles.WARN, data);
	const ref = useRef(null);
	useEffect(() => {
		if (ref.current != null) {
			ref.current.resetAfterIndex(0, true);
		}
	}, [data]);
	return ref;
};

const RENDER_OPTION_NOT_DEFINED = "???";

/**
 * 此為 renderRow 移至 Context 的版本
 */
const RWOptionPickerListboxV2 = memo(forwardRef((props, ref) => {
	const {
		children,
		// InfiniteLoader support
		getOptionKey,
		listMapRef,
		loadMoreItems,
		isItemLoaded,
		itemCount,
		threshold = 20,
		minimumBatchSize = 10,
		onItemsRendered: handleItemsRendered,
		...other
	} = props;
	console.log("%cRWOptionPickerListboxV2 re-rendered", ConsoleStyles.WARN);
	const optionPicker = useContext(OptionPickerContext);
	const { GridRowComponent, renderOptionLabel } = optionPicker;

	const baseComponentPropsRef = useRef();
	const prefixRef = useRef();
	const renderOption = useCallback((opts) => {
		// opts from React Window
		const { data, index, style } = opts;
		// Props from Autocomplete-renderOption
		let dataSet = data[index];
		// DEBUG 用請勿刪除
		// console.log(`renderOption index: ${index} dataSet:`, dataSet);

		// [新增] 保護機制：如果是無限載入尚未載入的項目，避免存取錯誤
		let option;
		let _componentProps;
		let _key;
		// let _group;
		// console.log("style", style);
		if (!dataSet) {
			// 這裡可以回傳一個 Loading Skeleton 或 null
			// console.log("listMap", listMapRef.current);
			option = listMapRef.current.get(index.toString());
			// console.log("style-virtual", style);
			_key = getOptionKey(option);
			if (!option) {
				return <div style={style}>Loading...</div>;
			}
			_componentProps = {
				...baseComponentPropsRef.current,
				id: prefixRef.current + "-option" + index,
				["data-option-index"]: index,
			}
		} else {
			const { key, ...componentProps } = dataSet[0];
			_key = key;
			option = dataSet[1];
			_componentProps = componentProps;
			if (!baseComponentPropsRef.current) {
				baseComponentPropsRef.current = componentProps;

				if (componentProps.id && componentProps.id.includes('-option-')) {
					// 提取 ":r7b:" 這個前綴
					prefixRef.current = componentProps.id.substring(0, componentProps.id.lastIndexOf('-option-'));
				}

			}
			// _group = dataSet.group;
			console.log("componentProps", componentProps)
		}


		const inlineStyle = {
			...style,
			top: style.top + LISTBOX_PADDING,
		};

		if (option.group !== undefined) {
			return (
				<ListSubheader
					key={_key}
					component="div"
					style={inlineStyle}>
					{option.group}
				</ListSubheader>
			);
		}

		return (
			<Typography
				key={_key}
				component="li"
				{..._componentProps}
				noWrap
				style={inlineStyle}>
				{GridRowComponent
					? <GridRowComponent value={option} />
					: (renderOptionLabel ? renderOptionLabel(option) : RENDER_OPTION_NOT_DEFINED)}
			</Typography>
		);
	}, [GridRowComponent, getOptionKey, listMapRef, renderOptionLabel]);


	const listItems = useMemo(() => {
		let results = [];
		// 原 mui options 若有 group 則可能非扁平化
		children.forEach((item) => {
			// 先加入 group
			results.push(item);
			// 若 group 下有 children 且為 array 則依序加進去
			if ('children' in item && Array.isArray(item.children)) {
				results.push(...item.children);
			}
		});
		// 如果 results 長度不足 _itemCount，補 null（或 {}）到指定長度
		// if (itemCount !== undefined && results.length < itemCount) {
		// 	results = results.concat(Array(itemCount - results.length).fill(null));
		// 	// 或填空物件：.fill({})
		// }
		return results;
	}, [children])

	const theme = useTheme();
	const smUp = useMediaQuery(theme.breakpoints.up("sm"), {
		noSsr: true,
	});

	const _itemCount = useMemo(() => {
		if (itemCount !== undefined) return itemCount;
		return listItems.length
	}, [itemCount, listItems.length]);

	const itemSize = useMemo(() => {
		return smUp ? ITEM_HEIGHT_DESKTOP : ITEM_HEIGHT_MOBILE
	}, [smUp]);

	/**
	 * 回應項目高度, group 是 48, 否則使用 itemSize
	 */
	const getChildSize = useCallback((child) => {
		if (!child) return itemSize;
		if (child.group !== undefined) {
			return 48;
		}

		return itemSize;
	}, [itemSize]);

	const listRef = useResetCache(listItems.length);

	const _height = useMemo(() => {
		const currentLoadedCount = listItems.length;
		if (currentLoadedCount > 8) {
			return 8 * itemSize + 2 * LISTBOX_PADDING;
		}
		// 如果還沒載入完，盡量不要讓高度變成 0
		if (currentLoadedCount === 0) return 100;

		return listItems.map(getChildSize).reduce((acc, cur) => acc + cur, 0)
			+ 2 * LISTBOX_PADDING;
	}, [getChildSize, listItems, itemSize])

	const defaultIsItemLoaded = useCallback((index) => {
		return index < listItems.length;
	}, [listItems.length]);

	const defaultLoadMoreItems = useCallback(() => { }, []);

	const handleIsItemLoaded = isItemLoaded || defaultIsItemLoaded;
	const handleLoadMoreItems = loadMoreItems || defaultLoadMoreItems;

	return (
		<Box ref={ref} sx={{
			"& ul": {
				margin: 0
			}
		}}>
			{/* 把傳遞給 ListboxComponent 的 props 都放置到 Provider 內
				讓 RWOuterElementType 可以存取,
			 */}
			<RWOuterElementContext.Provider value={other}>
				<InfiniteLoader
					isItemLoaded={handleIsItemLoaded}
					itemCount={_itemCount}
					loadMoreItems={handleLoadMoreItems}
					threshold={threshold}
					minimumBatchSize={minimumBatchSize}
				>
					{({ onItemsRendered, ref: loaderRef }) => (
						<VariableSizeList
							// ref={listRef}
							ref={(node) => {
								// 1. 設定給 InfiniteLoader
								loaderRef(node);
								// 2. 設定給內部的 listRef (用於 resetAfterIndex)
								if (listRef) {
									listRef.current = node;
								}
							}}
							height={_height}

							width="100%"
							outerElementType={RWOuterElementType}
							innerElementType="ul"

							itemData={listItems}
							itemCount={itemCount}
							itemSize={(index) => getChildSize(listItems[index])}

							overscanCount={5}
							onItemsRendered={handleItemsRendered(onItemsRendered)}
						>
							{renderOption}
						</VariableSizeList>
					)}
				</InfiniteLoader>
			</RWOuterElementContext.Provider>
		</Box>
	);
}));

RWOptionPickerListboxV2.displayName = "RWOptionPickerListboxV2";
RWOptionPickerListboxV2.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
	renderRow: PropTypes.func,
	// InfiniteLoader support
	listMapRef: PropTypes.ref,
	loadMoreItems: PropTypes.func,
	isItemLoaded: PropTypes.func,
	itemCount: PropTypes.number,
	threshold: PropTypes.number,
	minimumBatchSize: PropTypes.number,
	onItemsRendered: PropTypes.func.isRequired,
	getOptionKey: PropTypes.func
};

export default RWOptionPickerListboxV2;
