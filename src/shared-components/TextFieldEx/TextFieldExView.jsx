import Colors from "@/modules/Colors.mjs";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { useCallback } from "react";
import { useState } from "react";
import MuiStyles from "@/shared-modules/MuiStyles";
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { FlexBox } from "shared-components";

const IconProps = {
	fontSize: "small",
	sx: {
		padding: 0
	}
}

const TextFieldExView = (props) => {
	const { label, passwordToggle = false, passwordPressed = false, type, inline, disabled, required, readOnly, dense, error, borderless, disabledBackgroundColor = "rgba(0,0,0,0.05)", hideSpinButtons, sx = [], endAdornment, ...rest } = props;
	const [showPassword, setShowPassword] = useState(false);

	const handleClickShowPassword = useCallback(() => {
		setShowPassword(prev => !prev);
	}, []);

	const handleShowPassword = useCallback(() => {
		setShowPassword(true);
	}, []);

	const handleHidePassword = useCallback(() => {
		setShowPassword(false);
	}, []);

	const _type = useMemo(() => {
		return type === "password" && showPassword ? "text" : type;
	}, [showPassword, type])

	const _label = useMemo(() => {
		return (inline || borderless) ? "" : label;
	}, [borderless, inline, label])

	const withInputProps = useMemo(() => {
		return passwordToggle || passwordPressed || borderless || endAdornment;
	}, [borderless, endAdornment, passwordPressed, passwordToggle])

	const _required = useMemo(() => {
		return required && !disabled && !readOnly && !error;
	}, [disabled, error, readOnly, required])

	return (
		<FlexBox block={!inline} sx={{ fontWeight: 700 }}>
			{inline &&
				label
			}
			<TextField
				label={_label}
				type={_type}
				disabled={disabled}
				readOnly={readOnly}
				required={required}
				error={error}
				sx={[
					() => ({
						"&:has(.MuiInputBase-input:focus)": {
							// backgroundColor: "rgb(253 253 253)",
						},
						...(disabled && !borderless && {
							backgroundColor: disabledBackgroundColor,
						}),
						"&:not(.dsg-cell *) .MuiInputBase-root.Mui-readOnly, &:not(.dsg-cell *) .MuiInputBase-root.Mui-disabled": {
							backgroundColor: Colors.INPUT_BG_DISABLED
						},
						"& .clearable": {
							visibility: "hidden",
						},
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
						...(_required && {
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
								padding: 0,
								paddingLeft: "4px",
							},
							"& .MuiFilledInput-root": {
								...MuiStyles.GRADIENT_INPUT_BG,
								...(!disabled && MuiStyles.GRADIENT_INPUT_BG_HOVER),
								...(!disabled && MuiStyles.GRADIENT_INPUT_BG_FOCUSED),
								...(disabled && MuiStyles.TRANSPARENT_INPUT_BG)
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
				{...withInputProps && {
					InputProps: {
						...(passwordToggle && {
							endAdornment: (
								<InputAdornment position="end">
									<IconButton onClick={handleClickShowPassword} edge="end">
										{showPassword
											? <VisibilityOutlinedIcon {...IconProps} />
											: <VisibilityOffOutlinedIcon {...IconProps} />
										}
									</IconButton>
								</InputAdornment>
							),
						}),
						...(passwordPressed && {
							endAdornment: (
								<InputAdornment position="end">
									<IconButton onMouseDown={handleShowPassword} onMouseUp={handleHidePassword} edge="end" size="small">
										<VisibilityOutlinedIcon {...IconProps} />
									</IconButton>
								</InputAdornment>
							),
						}),
						...(typeof endAdornment === "string" && {
							endAdornment: <InputAdornment position="end">{endAdornment}</InputAdornment>,
						}),
						...(borderless && {
							disableUnderline: true
						})
					}
				}}
				// {... (passwordToggle && {
				// 	InputProps: {
				// 		endAdornment: (
				// 			<InputAdornment position="end">
				// 				<IconButton onClick={handleClickShowPassword} edge="end">
				// 					{showPassword ? <VisibilityOff {...IconProps} /> : <Visibility {...IconProps} />}
				// 				</IconButton>
				// 			</InputAdornment>
				// 		),
				// 	}
				// })}

				// {...(typeof endAdornment === "string" && {
				// 	InputProps: {
				// 		endAdornment: <InputAdornment position="end">{endAdornment}</InputAdornment>,
				// 	}
				// })}

				{
				...(borderless && {
					variant: "filled",
					// InputProps: { disableUnderline: true }
				})
				}
			/>
		</FlexBox>
	);
}

TextFieldExView.propTypes = {
	label: PropTypes.string,
	passwordToggle: PropTypes.bool,
	passwordPressed: PropTypes.bool,
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