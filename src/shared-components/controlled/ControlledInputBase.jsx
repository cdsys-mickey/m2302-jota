import { IconButton, InputBase, Tooltip } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import ClearIcon from "@mui/icons-material/Clear";

const ControlledInputBase = React.forwardRef((props, ref) => {
	const {
		name,
		readOnly,
		rules,
		control,
		onChange: handleInputChange,
		onClear,
		...rest
	} = props;
	return (
		<Controller
			name={name}
			defaultValue={""}
			rules={rules}
			render={({
				field: { ref, value, onChange },
				fieldState: { error },
			}) => (
				<InputBase
					ref={ref}
					value={value}
					onChange={
						readOnly
							? null
							: (e) => {
									onChange(e.target.value);
									if (handleInputChange) {
										handleInputChange(e.target.value);
									}
							  }
					}
					endAdornment={
						<Tooltip title={value ? "清除" : ""}>
							<IconButton
								// onClick={handleQueryStringClear}
								onClick={onClear}
								color="inherit"
								size="small"
								sx={[
									(theme) => ({
										visibility: "hidden",
										opacity: 0,
										transition: theme.transitions.create(
											"opacity",
											{
												easing: theme.transitions.easing
													.sharp,
												duration:
													theme.transitions.duration
														.leavingScreen,
											}
										),
										...(value && {
											opacity: 100,
											visibility: "visible",
										}),
									}),
								]}>
								<ClearIcon
									color="action"
									fontSize="small"
									position="end"
								/>
							</IconButton>
						</Tooltip>
					}
					{...rest}
				/>
			)}
		/>
	);
});

ControlledInputBase.protoTypes = {};

export default React.memo(ControlledInputBase);
