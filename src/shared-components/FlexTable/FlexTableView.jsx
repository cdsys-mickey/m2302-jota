import PropTypes from "prop-types";
import FlexBox from "../FlexBox";
import FlexTableContext from "./FlexTableContext";
import { useMemo } from "react";
import { memo } from "react";

const FlexTableViewComponent = (props) => {
	const { children, rowHeight, border = 0, padding, sx = [], ...rest } = props;

	const _border = useMemo(() => {
		if (typeof border === 'number' && border > 0) {
			return `${border}px solid #ccc`;
		}
		if (typeof border === 'string') {
			return border;
		}
		return undefined;
	}, [border]);

	const contextProps = useMemo(() => {
		return {
			border: _border,
			rowHeight,
			padding
		}
	}, [_border, padding, rowHeight])

	return (
		<FlexBox inline fullWidth sx={[
			(theme) => ({
				display: 'table',
				borderCollapse: 'collapse',
				...(_border && {
					border: _border
				})
			}),
			...(Array.isArray(sx) ? sx : [sx]),
		]} {...rest}>
			<FlexTableContext.Provider value={contextProps}>
				{children}
			</FlexTableContext.Provider>
		</FlexBox>
	);
}

FlexTableViewComponent.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.func, PropTypes.element]),
	border: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	padding: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	rowHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
}

const FlexTableView = memo(FlexTableViewComponent);
export default FlexTableView;