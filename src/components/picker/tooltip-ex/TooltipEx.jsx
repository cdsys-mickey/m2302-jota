import Types from "@/shared-modules/Types.mjs";
import { Tooltip } from "@mui/material";
import { pink } from "@mui/material/colors";
import { Box } from "@mui/system";
import PropTypes from "prop-types";
import { forwardRef, memo, useCallback, useMemo } from "react";

const TooltipEx = memo(forwardRef((props, ref) => {
	const { children, title, items, slotProps, negativeColor = pink[200], valueSeperator = "：", ...rest } = props;

	const containerStyles = useMemo(() => {
		return slotProps?.containerStyles ?? {
			padding: 0,
			margin: 0,
			listStyle: "none",
			display: "table",
		}
	}, [slotProps?.containerStyles])

	const _labelStyles = useMemo(() => {
		return slotProps?.labelStyles ?? {
			display: "table-cell",
			whiteSpace: "nowrap",
			pr: 1,
			textAlign: "right",
			fontWeight: "bold",
		}
	}, [slotProps?.labelStyles])

	const _valueStyles = useCallback(({ value }) => {
		return slotProps?.valueStyles
			? (Types.isFunction(slotProps?.valueStyles) ? slotProps?.valueStyles(value) : slotProps?.valueStyles) : {
				display: "table-cell",
				textAlign: "right",
				color: (value && value < 0) ? negativeColor : "inherit",
			}
	}, [negativeColor, slotProps]);

	/**
	 * 使用順序 items → title
	 */
	const _title = useMemo(() => {
		if (items && Types.isArray(items) && items.length > 0) {
			return (
				<Box
					component="ul"
					sx={{
						...containerStyles
					}}
				>
					{items.map((item) => {
						const value = Number(item.value); // 確保 value 是數字
						return (
							<Box
								component="li"
								key={item.label}
								sx={{
									display: "table-row",
								}}
							>
								<Box
									component="span"
									sx={{
										..._labelStyles
									}}
								>
									{item.label}{valueSeperator}
								</Box>
								<Box
									component="span"
									sx={{
										..._valueStyles({ label: item.label, value })
									}}
								>
									{item.value}
								</Box>
							</Box>
						);
					})}
				</Box>
			);
		}
		return title ?? "";
	}, [_labelStyles, _valueStyles, containerStyles, items, title, valueSeperator]);



	return (
		<Tooltip ref={ref} title={_title} {...rest}>{children}</Tooltip>
	);
}));

TooltipEx.propTypes = {
	title: PropTypes.string,
	negativeColor: PropTypes.string,
	valueSeperator: PropTypes.string,
	items: PropTypes.array,
	slotProps: PropTypes.object,
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array, PropTypes.func])
}

TooltipEx.displayName = "TooltipEx";
export default TooltipEx;