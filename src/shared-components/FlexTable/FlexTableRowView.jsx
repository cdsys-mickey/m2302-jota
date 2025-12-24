import PropTypes from "prop-types";
import { FlexBox } from "shared-components";
import { useMemo } from "react";
import FlexTableRowContext from "./FlexTableRowContext";
import { memo } from "react";

const FlexTableRowViewComponent = (props) => {
	const { children, height, border, sx = [], ...rest } = props;

	// const _border = useMemo(() => {
	// 	if (typeof border === 'number' && border > 0) {
	// 		return `${border}px solid #ccc`;
	// 	}
	// 	if (typeof border === 'string') {
	// 		return border;
	// 	}
	// 	return undefined;
	// }, [border]);

	const contextProps = useMemo(() => {
		return {
			height
		}
	}, [height])

	return (
		<FlexBox inline fullWidth sx={[
			(theme) => ({
				display: 'table-row'
			}),
			...(Array.isArray(sx) ? sx : [sx]),
		]} {...rest}>
			<FlexTableRowContext.Provider value={contextProps}>
				{children}
			</FlexTableRowContext.Provider>
		</FlexBox>
	);
}

FlexTableRowViewComponent.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.func, PropTypes.element]),
	height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	border: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}


const FlexTableRowView = memo(FlexTableRowViewComponent);
export default FlexTableRowView;