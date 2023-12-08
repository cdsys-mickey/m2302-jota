/* eslint-disable no-mixed-spaces-and-tabs */
import { IconButton, InputBase, Tooltip } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import ClearIcon from "@mui/icons-material/Clear";
import { forwardRef } from "react";
import PropTypes from "prop-types";
import InputBaseEx from "../input-ex/InputBaseEx";

const ZZControlledInputBaseEx = (props) => {
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
			control={control}
			defaultValue={""}
			rules={rules}
			render={({
				field: { ref, value, onChange },
				fieldState: { error },
			}) => (
				<InputBaseEx
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
					onClear={onClear}
					{...rest}
				/>
				// <InputBase
				// 	ref={ref}
				// 	value={value}
				// 	onChange={
				// 		readOnly
				// 			? null
				// 			: (e) => {
				// 					onChange(e.target.value);
				// 					if (handleInputChange) {
				// 						handleInputChange(e.target.value);
				// 					}
				// 			  }
				// 	}
				// 	endAdornment={
				// 		<Tooltip title={value ? "清除" : ""}>
				// 			<IconButton
				// 				onClick={onClear}
				// 				color="inherit"
				// 				size="small"
				// 				sx={[
				// 					(theme) => ({
				// 						visibility: "hidden",
				// 						opacity: 0,
				// 						transition: theme.transitions.create(
				// 							"opacity",
				// 							{
				// 								easing: theme.transitions.easing
				// 									.sharp,
				// 								duration:
				// 									theme.transitions.duration
				// 										.leavingScreen,
				// 							}
				// 						),
				// 						...(value && {
				// 							opacity: 100,
				// 							visibility: "visible",
				// 						}),
				// 					}),
				// 				]}>
				// 				<ClearIcon
				// 					color="action"
				// 					fontSize="small"
				// 					position="end"
				// 				/>
				// 			</IconButton>
				// 		</Tooltip>
				// 	}
				// 	{...rest}
				// />
			)}
		/>
	);
};
ZZControlledInputBaseEx.displayName = "ZZControlledInputBaseEx";
ZZControlledInputBaseEx.propTypes = {
	name: PropTypes.string.isRequired,
	readOnly: PropTypes.bool,
	rules: PropTypes.object,
	onChange: PropTypes.func,
	onClear: PropTypes.func,
	control: PropTypes.object,
};

export default ZZControlledInputBaseEx;
