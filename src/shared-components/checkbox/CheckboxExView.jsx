import {
	Checkbox,
	FormControl,
	FormControlLabel,
	FormHelperText,
	InputLabel
} from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";

const CheckboxExView = memo(
	forwardRef((props, ref) => {
		const { shrink = false, variant, fullWidth = false, label, slotProps, error, helperText, ...rest } = props;
		const { label: labelProps, ...checkboxSlotProps } = slotProps || {};

		const checkbox = (
			<Checkbox
				ref={ref}
				color="default"
				// {...(checkboxSlotProps && {
				// 	slotProps: checkboxSlotProps
				// })}
				{...checkboxSlotProps}
				{...rest}
			/>
		)

		return (
			<FormControl
				sx={{
					...(fullWidth && {
						width: "100%"
					}),

					display: 'inline-block', // 適應內容大小
					...(variant === "outlined" && {
						border: (theme) => `1px solid ${theme.palette.grey[400]}`, // 與 outlined TextField 未聚焦邊框顏色一致
						borderRadius: '4px', // 與 TextField 的圓角一致
						padding: '1px 8px 1px 8px ', // 內邊距
						backgroundColor: "#fff",
						'&:hover': {
							// borderColor: (theme) => theme.palette.grey[500], // 懸停時略深的灰色，模擬 TextField 行為
							borderColor: (theme) => "#000"
						},
						"& .MuiCheckbox-root": {
							padding: "8px"
						},
						'&:has(.Mui-focusVisible)': {
							borderColor: (theme) => theme.palette.primary.main, // 聚焦時使用主題主色
							borderWidth: '2px',
							padding: '0 7px 0 7px '
						},
						...(shrink && {
							'&::before': {
								// content: isFocused || isChecked ? '""' : undefined,
								content: '""',
								position: 'absolute',
								top: '-1px',
								left: '8px', // 與標籤對齊
								width: '40px', // 缺口寬度，根據標籤寬度調整
								height: '2px', // 覆蓋邊框
								background: '#fff', // 與背景一致，製造缺口效果
							},
						})
					})
				}}
			>

				{label ? <>
					{shrink && (
						<InputLabel shrink>{label}</InputLabel>
					)}
					<FormControlLabel
						label={shrink ? "" : label}
						error={error}
						control={
							checkbox
						}
						{...labelProps}

					/>
				</> : (checkbox)}
				{helperText && (
					<FormHelperText error={!!error}>
						{helperText}
					</FormHelperText>
				)}
			</FormControl>
		);
	})
);
CheckboxExView.displayName = "CheckboxExView";
CheckboxExView.propTypes = {
	shrink: PropTypes.bool,
	fullWidth: PropTypes.bool,
	variant: PropTypes.string,
	label: PropTypes.string,
	slotProps: PropTypes.object,
	error: PropTypes.object,
	helperText: PropTypes.string,
};
export default CheckboxExView;
