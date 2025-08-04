import Colors from "@/modules/Colors.mjs";
import { Visibility } from "@mui/icons-material";
import { VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { useCallback } from "react";
import { useState } from "react";
import FlexBox from "../FlexBox";

const IconProps = {
	fontSize: "small",
	sx: {
		padding: 0
	}
}

const TextFieldExView = (props) => {
	const { label, passwordToggle = false, type, inline, disabled, required, dense, error, borderless, disabledBackgroundColor = "rgba(0,0,0,0.05)", hideSpinButtons, sx = [], endAdornment, ...rest } = props;
	const [showPassword, setShowPassword] = useState(false);

	const handleClickShowPassword = useCallback(() => {
		setShowPassword(prev => !prev);
	}, []);

	const _type = useMemo(() => {
		return type === "password" && showPassword ? "text" : type;
	}, [showPassword, type])

	const _label = useMemo(() => {
		return (inline || borderless) ? "" : label;
	}, [borderless, inline, label])

	return (
		<FlexBox block={!inline} sx={{ fontWeight: 700 }}>
			{inline &&
				label
			}
			<TextField
				label={_label}
				type={_type}
				disabled={disabled}
				required={required}
				error={error}
				sx={[
					() => ({
						"&:has(.MuiInputBase-input:focus)": {
							// backgroundColor: "rgb(253 253 253)",
						},
						...(disabled && {
							backgroundColor: disabledBackgroundColor,
						}),
						"&:hover .clearable": {
							visibility: "visible",
						},
						...(dense && {
							"& .MuiInputBase-input": {
								paddingLeft: 1,
								paddingTop: 0.2,
								paddingBottom: 0.2,
								paddingRight: 0
							},
						}),
						"& .MuiFormHelperText-root": {
							marginTop: 0
						},
						...(required && !error && {
							"& .MuiInputLabel-root:not(.Mui-focused)": {
								color: Colors.REQUIRED,
							},
							"& .MuiOutlinedInput-root": {
								'& fieldset': {
									borderColor: Colors.REQUIRED,
								},
							}
						}),
						...(borderless && {
							"& input": {
								paddingTop: 0,
								paddingLeft: "4px",
								paddingRight: 0,
							}
						}),
						...(hideSpinButtons && {
							// 隱藏 WebKit 瀏覽器的箭頭
							'& input[type="number"]::-webkit-inner-spin-button, & input[type="number"]::-webkit-outer-spin-button': {
								display: 'none',
								paddingRight: "8px",
							},
							// 隱藏 Firefox 的箭頭
							'& input[type="number"]': {
								MozAppearance: 'textfield',
								paddingRight: "8px",
							},
						})
					}),
					...(Array.isArray(sx) ? sx : [sx]),
				]}
				{...rest}
				{... (passwordToggle && {
					InputProps: {
						endAdornment: (
							<InputAdornment position="end">
								<IconButton onClick={handleClickShowPassword} edge="end">
									{showPassword ? <VisibilityOff {...IconProps} /> : <Visibility {...IconProps} />}
								</IconButton>
							</InputAdornment>
						),
					}
				})}
				{...(typeof endAdornment === "string" && {
					InputProps: {
						endAdornment: <InputAdornment position="end">{endAdornment}</InputAdornment>,
					}
				})}

				{
				...(borderless && {
					variant: "filled",
					InputProps: { disableUnderline: true }
				})
				}
			/>
		</FlexBox>
	);
}

TextFieldExView.propTypes = {
	label: PropTypes.string,
	passwordToggle: PropTypes.bool,
	type: PropTypes.string,
	dense: PropTypes.bool,
	borderless: PropTypes.bool,
	hideSpinButtons: PropTypes.bool,
	inline: PropTypes.bool,
	disabled: PropTypes.bool,
	required: PropTypes.bool,
	error: PropTypes.bool,
	disabledBackgroundColor: PropTypes.string,
	sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	endAdornment: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
}

TextFieldExView.displayName = "TextFieldExView";
export default TextFieldExView;