import { Visibility } from "@mui/icons-material";
import { VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { useCallback } from "react";
import { useState } from "react";

const IconProps = {
	fontSize: "small",
	sx: {
		padding: 0
	}
}

const TextFieldExView = (props) => {
	const { passwordToggle = false, type, ...rest } = props;
	const [showPassword, setShowPassword] = useState(false);

	const handleClickShowPassword = useCallback(() => {
		setShowPassword(prev => !prev);
	}, []);

	const _type = useMemo(() => {
		return type === "password" && showPassword ? "text" : type;
	}, [showPassword, type])

	return (
		<TextField
			type={_type}
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


		/>
	);
}

TextFieldExView.propTypes = {
	passwordToggle: PropTypes.bool,
	type: PropTypes.string,
}

TextFieldExView.displayName = "TextFieldExView";
export default TextFieldExView;