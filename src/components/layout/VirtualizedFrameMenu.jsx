import { forwardRef, memo } from "react";
import { useScrollable } from "@/shared-hooks/useScrollable";
import PropTypes from "prop-types";
import FrameMenuItemButton from "./FrameMenuItemButton";
import LoadingTypography from "@/shared-components/LoadingTypography";
import ErrorBox from "@/shared-components/ErrorBox";
import { FixedSizeList as List } from "react-window";
import VirtualizedFrameMenuRow from "./VirtualizedFrameMenuRow";
import { Box } from "@mui/material";

const VirtualizedFrameMenu = memo(
	forwardRef((props, ref) => {
		const {
			height = 300,
			width = 260,
			authorities,
			authoritiesLoading,
			authoritiesError,
			itemCount,
			...rest
		} = props;

		if (authoritiesLoading) {
			return <LoadingTypography>讀取中...</LoadingTypography>;
		}

		if (authoritiesError) {
			return <ErrorBox error={authoritiesError} />;
		}

		return (
			<List
				innerRef={ref}
				height={height}
				itemCount={itemCount}
				itemSize={36}
				itemData={authorities}
				width={width - 4}>
				{VirtualizedFrameMenuRow}
			</List>
		);
	})
);

VirtualizedFrameMenu.propTypes = {
	height: PropTypes.number,
	width: PropTypes.number,
	itemCount: PropTypes.number,
	authorities: PropTypes.array,
	authoritiesLoading: PropTypes.bool,
	authoritiesError: PropTypes.object,
};

VirtualizedFrameMenu.displayName = "VirtualizedFrameMenu";

export default VirtualizedFrameMenu;
