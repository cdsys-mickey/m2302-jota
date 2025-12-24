import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { memo, useContext, useMemo } from "react";
import { FlexBox } from "shared-components";
import FlexTableContext from "./FlexTableContext";
import FlexTableRowContext from "./FlexTableRowContext";

const FlexTableCellViewComponent = (props) => {
	const { children, sx = [], slotProps, border, height, h, width, w, align, alignItems, justifyContent, padding, p, ...rest } = props;
	const { rowHeight: tableRowHeight, alignItems: tableAlignItems, border: tableBorder, padding: tablePadding, cellProps } = useContext(FlexTableContext) || {};
	const { rowHeight, alignItems: rowAlignItems, justifyContent: rowJustifyContent } = useContext(FlexTableRowContext) || {};

	// const contextProps = useMemo(() => {
	// 	return {
	// 		height: height ?? rowHeight ?? tableRowHeight
	// 	}
	// }, [height, rowHeight, tableRowHeight])
	const _height = useMemo(() => {
		return height ?? h ?? rowHeight ?? tableRowHeight
	}, [h, height, rowHeight, tableRowHeight])

	const _width = useMemo(() => {
		return width ?? w;
	}, [w, width])

	const _alignItems = useMemo(() => {
		return alignItems ?? rowAlignItems ?? tableAlignItems;
	}, [alignItems, rowAlignItems, tableAlignItems])

	const _justifyContent = useMemo(() => {
		if (align) {
			return align === "right" ? "flex-end" : "flex-start";
		}

		return justifyContent ?? rowJustifyContent;
	}, [align, justifyContent, rowJustifyContent])

	const _border = useMemo(() => {
		if (typeof border === 'number' && border > 0) {
			return `${border}px solid #ccc`;
		}
		if (typeof border === 'string') {
			return border;
		}
		return undefined;
	}, [border]);

	const __border = useMemo(() => {
		return _border ?? tableBorder;
	}, [_border, tableBorder])

	const _padding = useMemo(() => {
		return padding ?? p ?? tablePadding;
	}, [p, padding, tablePadding])

	const _cellProps = useMemo(() => {
		return {
			...cellProps,
			...rest
		}
	}, [cellProps, rest])

	const useFullHeight = useMemo(() => {
		return !!children;
	}, [children])

	return (
		<Box
			{...(_height && { height: _height })}
			{...(_width && { width: _width })}
			p={_padding}
			{...slotProps?.box}
			sx={{
				display: 'table-cell',
				...(__border && {
					border: __border,
				}),
				...slotProps?.box?.sx
			}}
		>
			<FlexBox
				fullWidth
				{...useFullHeight && ({ fullHeight: true })}
				{...(_alignItems && { alignItems: _alignItems })}
				{...(_justifyContent && { justifyContent: _justifyContent })}
				sx={[
					(theme) => ({
						...(align && {
							textAlign: align
						})
					}),
					...(Array.isArray(sx) ? sx : [sx]),
				]}
				{..._cellProps}
			>
				{children || " "}
			</FlexBox>
		</Box>
	);
}

FlexTableCellViewComponent.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.func, PropTypes.element]),
	border: PropTypes.string,
	sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	h: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	w: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	padding: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	p: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	alignItems: PropTypes.string,
	justifyContent: PropTypes.string,
	align: PropTypes.string,
	slotProps: PropTypes.object
}
const FlexTableCellView = memo(FlexTableCellViewComponent);
// FlexTableCellView.displayName = "FlexTableCellView";
export default FlexTableCellView;