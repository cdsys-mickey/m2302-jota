/* eslint-disable no-mixed-spaces-and-tabs */
import { useChangeTracking } from "@/shared-hooks/useChangeTracking";
import useDebounce from "@/shared-hooks/useDebounce";
import Forms from "@/shared-modules/Forms.mjs";
import MuiStyles from "@/shared-modules/sd-mui-styles";
import { TimePicker } from "@mui/x-date-pickers";
import PropTypes from "prop-types";
import { useCallback, useContext, useMemo, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormMetaContext } from "../../shared-contexts/form-meta/FormMetaContext";

const DEFAULT_PROPS = {
	size: "small",
	InputLabelProps: {
		shrink: true,
	},
};

const ControlledTimePicker = ({
	label = "日期",
	name,
	control,
	readOnly,
	dense,
	views = ['hours', 'minutes'],
	ampm = false,
	clearable = false,
	defaultValue,
	onChange: _onChange,
	onChanged,
	required = false,
	rules,
	onBlur,
	debounce = 800,
	...rest
}) => {
	const { isFieldDisabled, focusNextField, disableEnter } = useContext(FormMetaContext) || {};
	const form = useFormContext();
	const { InputProps, ...opts } = DEFAULT_PROPS;

	const [innerValue, setInnerValue] = useState();
	const debouncedValue = useDebounce(innerValue, debounce);

	useChangeTracking(() => {
		if (!readOnly && onChanged) {
			onChanged(debouncedValue);
		}
	}, [debouncedValue], {
		debug: true
	});


	const getError = useCallback(
		async (opts = { debug: false }) => {
			if (!name) {
				return;
			}
			const result = await form.trigger(name);
			if (result) {
				return false;
			}
			const fieldState = form.getFieldState(name);
			if (opts.debug) {
				console.error(`${name}.fieldState.error`, fieldState.error);
			}
			return fieldState.error;
		},
		[form, name]
	);

	const handleKeyDown = useCallback(
		async (e) => {
			//if (e.key === "Enter" || e.key === "Tab") {
			if (((e.key === "Enter" && !disableEnter) && !e.shiftKey) || e.key === "Tab") {
				e.preventDefault();
				const error = await getError();
				if (error) {
					// 錯誤則不往下傳遞給 DSGGrid
					// e.stopPropagation();
					form.setError(name, error);
					return;
				}
				if (focusNextField) {
					e.preventDefault();
					focusNextField(name, {
						setFocus: form.setFocus,
						isFieldDisabled,
						forward: !e.shiftKey,
						e
					});
				}
			}
		},
		[disableEnter, getError, focusNextField, form, name, isFieldDisabled]
	);

	const _rules = useMemo(() => {
		return {
			...rules,
			validate: {
				...rules?.validate,
				validateTime: Forms.getTimeValidator({
					fieldName: label,
					required
				})
			}
		}
	}, [label, required, rules])

	if (!name) {
		return <TimePicker views={views} ampm={ampm} {...rest} />;
	}

	return (
		<Controller
			name={name}
			defaultValue={defaultValue || null}
			control={control}
			// rules={rules}
			rules={_rules}
			render={({
				field: { ref, value, onChange },
				fieldState: { error },
			}) => {
				return (
					<TimePicker
						// autoOk
						inputRef={ref}
						label={label ? `${label}${required ? "*" : ""}` : ""}
						views={views}
						ampm={ampm}
						slotProps={{
							inputAdornment: {
								sx: {
									...(dense && {
										'& .MuiSvgIcon-root': { fontSize: '18px' }
									})
								}
							},
							textField: {
								size: "small",
								onKeyDown: handleKeyDown,
								InputLabelProps: {
									...MuiStyles.DEFAULT_INPUT_LABEL_PROPS,
									...(dense && {
										shrink: true,
									})
								},
								error: !!error,
								helperText: error?.message,
								onBlur: onBlur
							},
							sx: {
								...(dense && {
									"& .MuiInputBase-input":
									{
										paddingTop: "4px",
										paddingBottom: "4px",
										// paddingLeft: "2px",
										// paddingRight: "40px",
									},
								})
							},
							field: {
								clearable
							}
						}}
						value={value}
						onChange={
							readOnly
								? null
								: (newValue) => {
									// 為了正確反應鍵盤操作, 即使格式錯誤還是照樣 render
									if (_onChange) {
										_onChange(newValue);
									}

									onChange(newValue);

									if (onChanged) {
										setInnerValue(newValue);
									}
								}
						}
						onKeyDown={handleKeyDown}
						InputProps={{
							...InputProps,
							...(readOnly && { readOnly: true }),
						}}
						{...opts}
						disabled={readOnly}
						{...rest}

					/>)
			}}
		/>
	);
};
ControlledTimePicker.propTypes = {
	label: PropTypes.string,
	name: PropTypes.string,
	control: PropTypes.object,
	dense: PropTypes.bool,
	readOnly: PropTypes.bool,
	defaultValue: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.object,
	]),
	onChange: PropTypes.func,
	onBlur: PropTypes.func,
	onChanged: PropTypes.func,
	mask: PropTypes.string,
	format: PropTypes.string,
	invalidDateMessage: PropTypes.string,
	required: PropTypes.bool,
	rules: PropTypes.object,
	clearable: PropTypes.bool,
	validate: PropTypes.bool,
	debounce: PropTypes.number,
	views: PropTypes.array,
	ampm: PropTypes.bool,
};
export default ControlledTimePicker;
