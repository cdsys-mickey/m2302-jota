import Objects from "@/shared-modules/Objects.mjs";
import Types from "@/shared-modules/Types.mjs";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import PropTypes from "prop-types";
import { forwardRef, memo, useMemo } from "react";
		fields: "rowData,active,disabled,focus",
		debug: true,
	});
};

export const TooltipExComponent = memo(
	forwardRef((props, ref) => {
		const { columnData, rowData, title } = props;
		// console.log("rendering TooltipExComponent", rowData);
		const { ...rest } = columnData || {};

		const isValidRowData = Array.isArray(rowData) ? rowData.length > 0 : !!rowData;

		const _title = useMemo(() => {
			return title ?? (Types.isArray(rowData) ? null : rowData);
		}, [rowData, title]);

		return isValidRowData ? (
			<TooltipEx
				ref={ref}
				title={_title}
				{
				...(Types.isArray(rowData) && {
					items: rowData
				})
				}
				{...rest}
			>
				<HelpOutlineIcon
					sx={{
						marginLeft: "8px",
						marginRight: "8px",
					}}
				/>
			</TooltipEx>
		) : false;
	})
	, arePropsEqual
);

TooltipExComponent.propTypes = {
	title: PropTypes.string,
	columnData: PropTypes.object,
	rowData: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
	rowIndex: PropTypes.number,
};

TooltipExComponent.displayName = "TooltipExComponent";
