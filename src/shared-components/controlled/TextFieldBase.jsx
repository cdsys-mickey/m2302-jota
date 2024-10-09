import MuiStyles from "@/shared-modules/sd-mui-styles";
import { TextField } from "@mui/material";

const TextFieldBase = (props) => {
	const { ref, value, disabled, readOnly, onChange, sx = [], disabledBackgroundColor, InputLabelProps, onChange: _onChange, ...rest } = props;
	return (
		<TextField
			value={value}
			// multiline={multiline}
			inputRef={ref}
			sx={[
				(theme) => ({
					"&:has(.MuiInputBase-input:focus)": {
						// backgroundColor: "rgb(253 253 253)",
					},
					"& .MuiOutlinedInput-root": {
						paddingRight: theme.spacing(1),
					},
					...(disabled && {
						backgroundColor: disabledBackgroundColor,
					}),
					"&:hover .clearable": {
						visibility: "visible",
					},
					// "& .clearable": {
					// 	visibility: "hidden",
					// },
				}),
				...(Array.isArray(sx) ? sx : [sx]),
			]}
			onChange={(e) => {
				if (readOnly) {
					return;
				}
				onChange(e.target.value);
				if (_onChange) {
					_onChange(e.target.value);
				}
			}}
			onKeyDown={handleKeyDown}
			InputLabelProps={{
				...MuiStyles.DEFAULT_INPUT_LABEL_PROPS,
				...InputLabelProps,
				...(labelShrink && { shrink: true }),
			}}
			InputProps={{
				...(readOnly && {
					readOnly: true,
					// disableUnderline: true,
				}),
				...(renderEndAdornment && {
					endAdornment: (
						<>
							{clearable && (
								<ClearInputButton
									className="clearable"
									value={value}
									onChange={onChange}
								/>
							)}
							{EndAdornmentComponent && (
								<EndAdornmentComponent />
							)}
						</>
					),
				}),
			}}
			disabled={disabled}
			error={!!error}
			helperText={error?.message}
			{...rest}
		/>
	);
}

TextFieldBase.propTypes = {

}

TextFieldBase.displayName = "TextFieldBase";
export default TextFieldBase;