import {
	Checkbox,
	FormControlLabel
} from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef, memo, useMemo } from "react";
import TooltipWrapper from "../TooltipWrapper/TooltipWrapper";

const CheckboxExView = memo(
	forwardRef((props, ref) => {
		const { disabled, tooltip, label, slotProps, ...rest } = props;
		const { label: labelProps } = slotProps || {};

		const checkbox = useMemo(() => {
			return (
				<Checkbox
					ref={ref}
					// color="default"
					// {...(checkboxSlotProps && {
					// 	slotProps: checkboxSlotProps
					// })}
					disabled={disabled}
					sx={{
						// 確保根元素有定位和 z-index
						'&.MuiCheckbox-root': {
							padding: "8px",
							position: 'relative',
							zIndex: 1, // 讓 Checkbox 本身在我們的背景偽元素之上
						},

						// 針對 Checkbox 內部的 SVG 元素
						'& .MuiSvgIcon-root': {
							// 這個樣式很重要，它控制了方框或勾的顏色。
							// 預設情況下，`color` prop 已經將 SVG 的 `fill` 設定為主題色。
							// 在未勾選時，這個 SVG 的 `fill` 基本上是透明的，只有 `stroke` 是主題色。
						},

						// ------------------------------------------------------------------
						// **處理未勾選狀態的實心白色背景**
						// 當 Checkbox 未勾選時，添加一個白色背景的偽元素
						'&:not(.Mui-checked)::before': {
							content: '""',
							width: '1em',
							height: '1em',
							position: 'absolute',
							top: '50%',
							left: '50%',
							transform: 'translate(-50%, -50%)',
							background: 'white', // **讓未勾選的透明中心變白色 (實心)**
							borderRadius: '2px',
							zIndex: -1, // 放在 SVG 圖標下方
						},

						// ------------------------------------------------------------------
						// **處理已勾選狀態的白色勾背景**
						// 當 Checkbox 勾選時，添加一個白色背景的偽元素 (這和上一個答案一致)
						// 讓透明的勾透出白色
						'&.Mui-checked::before': {
							content: '""',
							width: '1em',
							height: '1em',
							position: 'absolute',
							top: '50%',
							left: '50%',
							transform: 'translate(-50%, -50%)',
							background: 'white', // **讓透明勾透出白色**
							borderRadius: '2px',
							zIndex: -1,
						},
					}}
					{...rest}
				/>
			);
		}, [disabled, ref, rest])

		if (label) {
			return (
				<TooltipWrapper title={tooltip}>
					<FormControlLabel
						label={label}
						disabled={disabled}
						control={
							checkbox
						}
						slotProps={{
							...labelProps
						}}
					/>
				</TooltipWrapper>
			)
		}

		return (
			<TooltipWrapper title={tooltip}>
				{checkbox}
			</TooltipWrapper>
		);
	})
);
CheckboxExView.displayName = "CheckboxExView";
CheckboxExView.propTypes = {
	disabled: PropTypes.bool,
	shrink: PropTypes.bool,
	fullWidth: PropTypes.bool,
	dense: PropTypes.bool,
	variant: PropTypes.string,
	label: PropTypes.string,
	slotProps: PropTypes.object,
	error: PropTypes.object,
	helperText: PropTypes.string,
	tooltip: PropTypes.string,
};
export default CheckboxExView;
