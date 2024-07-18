/* eslint-disable no-mixed-spaces-and-tabs */
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";
import ClearInputButton from "../input/ClearInputButton";
import { useMemo } from "react";
import { useCallback } from "react";
import { useRef } from "react";
import { useImperativeHandle } from "react";

export const ControlledTextField = ({
	name,
	inputRef,
	readOnly = false,
	control,
	onChange: onTextChange,
	nextInputRef,
	prevInputRef,
	onKeyDown,
	rules,
	labelShrink = false,
	defaultValue = "",
	sx = [],
	clearable,
	EndAdornmentComponent,
	selectNext,
	...rest
}) => {
	const innerInputRef = useRef();

	useImperativeHandle(inputRef, () => innerInputRef.current);

	const renderEndAdornment = useMemo(() => {
		return EndAdornmentComponent || clearable;
	}, [EndAdornmentComponent, clearable]);

	const handleKeyDown = useCallback(
		(e) => {
			if (onKeyDown) {
				onKeyDown(e);
			}
			if (e.key === "Enter" || e.key === "Tab") {
				e.preventDefault();
				if (e.shiftKey && prevInputRef.current) {
					prevInputRef.current.focus();
					prevInputRef.current.select();
				} else if (nextInputRef.current) {
					nextInputRef.current.focus();
					nextInputRef.current.select();
				}
			}
		},
		[nextInputRef, onKeyDown, prevInputRef]
	);

	if (!name) {
		return (
			<TextField
				inputRef={innerInputRef}
				sx={[
					(theme) => ({
						"&:has(.MuiInputBase-input:focus)": {
							// backgroundColor: "rgb(253 253 253)",
						},
						"& .MuiOutlinedInput-root": {
							paddingRight: theme.spacing(1),
						},
					}),
					...(Array.isArray(sx) ? sx : [sx]),
				]}
				onChange={onTextChange}
				onKeyDown={handleKeyDown}
				InputLabelProps={{
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
								{EndAdornmentComponent && (
									<EndAdornmentComponent />
								)}
							</>
						),
					}),
				}}
				disabled={readOnly}
				{...rest}
			/>
		);
	}

	return (
		<Controller
			name={name}
			defaultValue={defaultValue}
			control={control}
			rules={rules}
			render={({ field: { value, onChange }, fieldState: { error } }) => (
				<TextField
					value={value}
					inputRef={innerInputRef}
					sx={[
						(theme) => ({
							"&:has(.MuiInputBase-input:focus)": {
								// backgroundColor: "rgb(253 253 253)",
							},
							"& .MuiOutlinedInput-root": {
								paddingRight: theme.spacing(1),
							},
						}),
						...(Array.isArray(sx) ? sx : [sx]),
					]}
					onChange={(e) => {
						if (readOnly) {
							return;
						}
						onChange(e.target.value);
						if (onTextChange) {
							onTextChange(e.target.value);
						}
					}}
					onKeyDown={handleKeyDown}
					InputLabelProps={{
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
					disabled={readOnly}
					error={!!error}
					helperText={error?.message}
					{...rest}
				/>
			)}
		/>
	);
};

ControlledTextField.propTypes = {
	name: PropTypes.string,
	readOnly: PropTypes.bool,
	control: PropTypes.object,
	onChange: PropTypes.func,
	required: PropTypes.bool,
	rules: PropTypes.object,
	labelShrink: PropTypes.bool,
	defaultValue: PropTypes.string,
	sx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	clearable: PropTypes.bool,
	EndAdornmentComponent: PropTypes.oneOfType([
		PropTypes.func,
		PropTypes.elementType,
	]),
	nextInputRef: PropTypes.object,
	prevInputRef: PropTypes.object,
	onKeyDown: PropTypes.func,
	inputRef: PropTypes.object,
	selectNext: PropTypes.bool,
};
