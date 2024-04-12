import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import PropTypes from "prop-types";
import { forwardRef, useContext, useEffect, useRef } from "react";
import { VariableSizeList } from "react-window";
import { OptionPickerContext } from "./OptionPickerContext";
import { RWOuterElementContext } from "./RWOuterElementContext";
import RWOuterElementType from "./RWOuterElementType";
import { ListSubheader, Typography } from "@mui/material";

const LISTBOX_PADDING = 8; // px

function renderRow(props) {
	// Props from React Window
	const { data, index, style } = props;

	// Props from Autocomplete-renderOption
	const dataSet = data[index];

	const componentProps = dataSet[0];
	const optionLabel = dataSet[1];

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
			component="li"
			{...componentProps}
			noWrap
			style={inlineStyle}>
			{optionLabel}
		</Typography>
	);
}

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
const ListboxComponent = forwardRef(function ListboxComponent(props, ref) {
	const { children, ...other } = props;

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

ListboxComponent.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
};

export default ListboxComponent;
