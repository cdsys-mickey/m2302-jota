import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import PropTypes from "prop-types";
import { forwardRef, useContext, useEffect, useRef } from "react";
import { VariableSizeList } from "react-window";
import { OptionPickerContext } from "./OptionPickerContext";
import { RWOuterElementContext } from "./RWOuterElementContext";
import RWOuterElementType from "./RWOuterElementType";

const LISTBOX_PADDING = 8; // px

const useResetCache = (data) => {
	const ref = useRef(null);
	useEffect(() => {
		if (ref.current != null) {
			ref.current.resetAfterIndex(0, true);
		}
	}, [data]);
	return ref;
};

// Adapter for react-window
const RWListboxComponent = forwardRef(function RWListboxComponent(props, ref) {
	const { children, ...other } = props;
	const optionPicker = useContext(OptionPickerContext);

	if (!optionPicker) {
		throw new Error("沒有偵測到 OptionPickerContext");
	}

	const { renderRow } = optionPicker;

	const itemData = [];
	children.forEach((item) => {
		itemData.push(item);
		itemData.push(...(item.children || []));
	});

	const theme = useTheme();
	const smUp = useMediaQuery(theme.breakpoints.up("sm"), {
		noSsr: true,
	});
	const itemCount = itemData.length;
	const itemSize = smUp ? 36 : 48;

	const getChildSize = (child) => {
		if (child.group !== undefined) {
			return 48;
		}

		return itemSize;
	};

	const getHeight = () => {
		if (itemCount > 8) {
			return 8 * itemSize;
		}
		return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
	};

	const gridRef = useResetCache(itemCount);

	return (
		<div ref={ref}>
			{/* 把傳遞給 ListboxComponent 的 props 都放置到 Provider 內 */}
			<RWOuterElementContext.Provider value={other}>
				<VariableSizeList
					itemData={itemData}
					height={getHeight() + 2 * LISTBOX_PADDING}
					width="100%"
					ref={gridRef}
					outerElementType={RWOuterElementType}
					innerElementType="ul"
					itemSize={(index) => getChildSize(itemData[index])}
					overscanCount={5}
					itemCount={itemCount}>
					{renderRow}
				</VariableSizeList>
			</RWOuterElementContext.Provider>
		</div>
	);
});

RWListboxComponent.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
};

export default RWListboxComponent;
