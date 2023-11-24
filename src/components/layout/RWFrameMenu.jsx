import ErrorBox from "@/shared-components/ErrorBox";
import LoadingTypography from "@/shared-components/LoadingTypography";
import PropTypes from "prop-types";
import { memo } from "react";
import { FixedSizeList as List } from "react-window";
import RWFrameMenuRow from "./RWFrameMenuRow";
import { forwardRef } from "react";

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
	} = props;

	if (loading) {
		return <LoadingTypography>讀取中...</LoadingTypography>;
	}

	if (error) {
		return <ErrorBox error={error} />;
	}

	return (
		<List
			// innerRef={ref}
			height={height}
			itemCount={itemCount}
			itemSize={34}
			itemData={data}
			width={width - 4}
			innerElementType={innerElementType}>
			{RWFrameMenuRow}
		</List>
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

RWFrameMenu.displayName = "VirtualizedFrameMenu";

export default RWFrameMenu;
