/* eslint-disable no-mixed-spaces-and-tabs */
import DateFormats from "@/shared-modules/sd-date-formats";
import { DateField } from "@mui/x-date-pickers";
import { isValid } from "date-fns";
import { de } from "date-fns/locale";
import PropTypes from "prop-types";
import { useContext } from "react";
import { useCallback } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormMetaContext } from "../../shared-contexts/form-meta/FormMetaContext";

const DEFAULT_PROPS = {
	size: "small",
	InputLabelProps: {
		shrink: true,
	},
};

const ControlledDateField = ({
	// for Controller
	name,
	control,
	rules,
	defaultValue,
	// for TextField
	label = "日期",
	readOnly,
	onChange: _onChange,
	mask = "____/__/__",
	format = DateFormats.DATEFNS_DATE,
	invalidDateMessage = "日期格式錯誤",
	required = false,
	...rest
}) => {
	const { setError, clearErrors } = useFormContext();
	const { isFieldDisabled, nextField, disableEnter } = useContext(FormMetaContext) || {};
	const { setFocus } = useFormContext() || {};

	const { InputProps, ...opts } = DEFAULT_PROPS;

	const handleKeyDown = useCallback(
		(e) => {
			// if (e.key === "Enter" || e.key === "Tab") {
			if (((e.key === "Enter" && !disableEnter) && !e.shiftKey) || e.key === "Tab") {
				e.preventDefault();
				nextField(name, {
					setFocus,
					isFieldDisabled,
					forward: !e.shiftKey,
					e
				});
			}
		},
		[disableEnter, nextField, name, setFocus, isFieldDisabled]
	);

	if (!name) {
		return (
			<DateField
				defaultValue={defaultValue}
				label={label}
				readOnly={readOnly}
				onChange={_onChange}
				onKeyDown={handleKeyDown}
				mask={mask}
				format={format}
				invalidDateMessage={invalidDateMessage}
				required={required}
				{...rest}
			/>
		);
	}

	return (
		<Controller
			name={name}
			defaultValue={defaultValue || null}
			control={control}
			rules={rules}
			render={({
				field: { ref, value, onChange },
				fieldState: { error },
			}) => (
				<DateField
					// autoOk
					inputRef={ref}
					label={label ? `${label}${required ? "*" : ""}` : ""}
					mask={mask}
					format={format}
					value={value}
					required={required}
					onChange={(newValue) => {
						if (readOnly) {
							return;
						}
						// 為了正確反應鍵盤操作, 即使格式錯誤還是照樣 render
						onChange(newValue);
						if (_onChange) {
							_onChange(newValue);
						}
						if (isValid(newValue)) {
							if (clearErrors) {
								clearErrors(name);
							}
						} else {
							setError(name, {
								message: invalidDateMessage,
							});
						}
					}}
					onKeyDown={handleKeyDown}
					{...opts}
					InputProps={{
						...InputProps,
						readOnly,
					}}
					disabled={readOnly}
					onError={(err) => {
						console.error(err);
					}}
					invalidDateMessage={invalidDateMessage}
					{...rest}
				/>
			)}
		/>
	);
};
ControlledDateField.propTypes = {
	label: PropTypes.string,
	name: PropTypes.string,
	control: PropTypes.object,
	rules: PropTypes.object,
	defaultValue: PropTypes.object,
	readOnly: PropTypes.bool,
	onChange: PropTypes.func,
	mask: PropTypes.string,
	format: PropTypes.string,
	invalidDateMessage: PropTypes.string,
	labelShrink: PropTypes.bool,
	required: PropTypes.bool,
};
export default ControlledDateField;
