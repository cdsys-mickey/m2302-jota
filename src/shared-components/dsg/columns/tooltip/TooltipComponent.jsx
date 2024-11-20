import { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import { Tooltip } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useMemo } from "react";
import Objects from "@/shared-modules/sd-objects";

const arePropsEqual = (oldProps, newProps) => {
	return Objects.arePropsEqual(oldProps, newProps, {
		header: TooltipComponent.displayName,
		fields: "rowData,active,disabled,focus",
		debug: true,
	});
};

export const TooltipComponent = memo(
	forwardRef((props, ref) => {
		const { columnData, rowData, rowIndex } = props;
		console.log("rendering TooltipComponent", rowData);
		const { title, ...rest } = columnData || {};

		const _title = useMemo(() => {
			return title || rowData;
		}, [rowData, title]);

		// const _open = useMemo(() => {
		// 	return activeRow != null ? activeRow == rowIndex : null;
		// }, [activeRow, rowIndex])

		return rowData ? (
			<Tooltip
				ref={ref}
				title={_title}
				{...rest}
			// {...(_open != null && {
			// 	open: _open
			// })}
			>
				<HelpOutlineIcon
					sx={{
						marginLeft: "8px",
						marginRight: "8px",
					}}
				/>
			</Tooltip>
		) : false;
	})
	, arePropsEqual
);

TooltipComponent.propTypes = {
	columnData: PropTypes.object,
	rowData: PropTypes.string,
	rowIndex: PropTypes.number,
};

TooltipComponent.displayName = "TooltipComponent";
