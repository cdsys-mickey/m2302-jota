import ErrorBox from "@/shared-components/ErrorBox";
import LoadingTypography from "@/shared-components/LoadingTypography";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import { Virtuoso } from "react-virtuoso";
import VFrameMenuRow from "./VFrameMenuRow";
import { useState } from "react";
import { LogLevel } from "react-virtuoso";

const VFrameMenu = memo(
	forwardRef((props, ref) => {
		const {
			height = 300,
			width = 260,
			itemCount,
			error,
			data,
			loading,
		} = props;

		if (loading) {
			return <LoadingTypography>讀取中...</LoadingTypography>;
		}

		if (error) {
			return <ErrorBox error={error} />;
		}

		return (
			<Virtuoso
				ref={ref}
				style={{ height: height }}
				totalCount={itemCount}
				data={data}
				fixedItemHeight={36}
				logLevel={LogLevel.DEBUG}
				itemContent={(index, item) => {
					// console.debug(`rendering ${index}..`);
					return <VFrameMenuRow index={index} value={item} />;
				}}
				scrollSeekConfiguration={{
					enter: (velocity) => Math.abs(velocity) > 360,
					exit: (velocity) => {
						const shouldExit = Math.abs(velocity) < 40;
						// if (shouldExit) {
						// 	setVisibleRange(["-", "-"]);
						// }
						return shouldExit;
					},
					// change: (_velocity, { startIndex, endIndex }) =>
					// 	setVisibleRange([startIndex, endIndex]),
				}}
			/>
		);
	})
);

VFrameMenu.propTypes = {
	height: PropTypes.number,
	width: PropTypes.number,
	itemCount: PropTypes.number,
	data: PropTypes.array,
	loading: PropTypes.bool,
	error: PropTypes.object,
};

VFrameMenu.displayName = "VFrameMenu";
export default VFrameMenu;
