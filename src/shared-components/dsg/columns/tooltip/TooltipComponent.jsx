import { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import { Tooltip } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useMemo } from "react";

export const TooltipComponent = memo(
	forwardRef((props, ref) => {
		const { columnData, rowData } = props;
		const { getLabel, ...rest } = columnData || {};

		const label = useMemo(() => {
			if (!rowData.SOrdID) {
				return "";
			}
			return getLabel ? getLabel(rowData) : "(空白)";
		}, [getLabel, rowData]);

		return rowData?.SOrdID ? (
			<Tooltip ref={ref} title={label} {...rest}>
				<HelpOutlineIcon
					sx={{
						marginLeft: "8px",
						marginRight: "8px",
					}}
				/>
			</Tooltip>
		) : (
			false
		);
	})
);

TooltipComponent.propTypes = {
	columnData: PropTypes.object,
	rowData: PropTypes.object,
	rowIndex: PropTypes.number,
};

TooltipComponent.displayName = "TooltipComponent";
