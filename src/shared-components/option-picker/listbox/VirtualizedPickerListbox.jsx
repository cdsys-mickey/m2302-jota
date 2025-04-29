import { Box, ListSubheader, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import PropTypes from "prop-types";
import { forwardRef, memo, useCallback, useEffect, useMemo, useRef } from "react";
import { VariableSizeList } from "react-window";
import { RWOuterElementContext } from "./RWOuterElementContext";
import RWOuterElementType from "./RWOuterElementType";
import { OptionPickerContext } from "./OptionPickerContext";
import { useContext } from "react";

const LISTBOX_PADDING = 8; // px
const ITEM_HEIGHT_MOBILE = 48;
const ITEM_HEIGHT_DESKTOP = 36;

const useResetCache = (data) => {
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
const VirtualizedPickerListbox = memo(forwardRef((props, ref) => {
	const { children, ...other } = props;
	// console.log("VirtualizedPickerListbox.otherProps", other)
	const optionPicker = useContext(OptionPickerContext);
	const { GridRowComponent, renderOptionLabel } = optionPicker;

	// if (!optionPicker) {
	// 	throw new Error("沒有偵測到 OptionPickerContext");
	// }

	const renderOption = useCallback((opts) => {
		// opts from React Window
		const { data, index, style } = opts;

		// Props from Autocomplete-renderOption
		const dataSet = data[index];
		// console.log(`dataSet[${index}]`, dataSet);

		const { key, ...componentProps } = dataSet[0];
		const option = dataSet[1];

		const inlineStyle = {
			...style,
			top: style.top + LISTBOX_PADDING,
		};

		if (dataSet.group !== undefined) {
			return (
				<ListSubheader
					key={dataSet.key}
					component="div"
					style={inlineStyle}>
					{dataSet.group}
				</ListSubheader>
			);
		}

		return (
			<Typography
				key={key}
				component="li"
				{...componentProps}
				noWrap
				style={inlineStyle}>
				{GridRowComponent
					? <GridRowComponent value={option} />
					: (renderOptionLabel ? renderOptionLabel(option) : RENDER_OPTION_NOT_DEFINED)}
			</Typography>
		);
	}, [GridRowComponent, renderOptionLabel]);

	// const { renderRow } = optionPicker;

	const itemData = useMemo(() => {
		let results = [];
		children.forEach((item) => {
			results.push(item);
			results.push(...(item.children || []));
		});
		return results;
	}, [children])


	const theme = useTheme();
	const smUp = useMediaQuery(theme.breakpoints.up("sm"), {
		noSsr: true,
	});

	const itemCount = useMemo(() => {
		return itemData.length
	}, [itemData?.length]);

	const itemSize = useMemo(() => {
		return smUp ? ITEM_HEIGHT_DESKTOP : ITEM_HEIGHT_MOBILE
	}, [smUp]);

	/**
	 * 回應項目高度, group 是 48
	 */
	const getChildSize = useCallback((child) => {
		if (child.group !== undefined) {
			return 48;
		}

		return itemSize;
	}, [itemSize]);

	// const getHeight = useCallback(() => {
	// 	if (itemCount > 8) {
	// 		return 8 * itemSize;
	// 	}
	// 	return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
	// }, [getChildSize, itemCount, itemData, itemSize]);

	const listRef = useResetCache(itemCount);

	const _height = useMemo(() => {
		// 若項目大於 8 個就不再一一計算
		if (itemCount > 8) {
			return 8 * itemSize + 2 * LISTBOX_PADDING;
		}
		return itemData.map(getChildSize).reduce((acc, cur) => acc + cur, 0)
			+ 2 * LISTBOX_PADDING;
	}, [getChildSize, itemCount, itemData, itemSize])

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
				<VariableSizeList
					itemData={itemData}
					height={_height}
					width="100%"
					ref={listRef}
					outerElementType={RWOuterElementType}
					innerElementType="ul"
					itemSize={(index) => getChildSize(itemData[index])}
					overscanCount={5}
					itemCount={itemCount}>
					{renderOption}
				</VariableSizeList>
			</RWOuterElementContext.Provider>
		</Box>
	);
}));

VirtualizedPickerListbox.displayName = "VirtualizedPickerListbox";
VirtualizedPickerListbox.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
	renderRow: PropTypes.func
};

export default VirtualizedPickerListbox;
