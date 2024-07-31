/* eslint-disable no-mixed-spaces-and-tabs */
import DateFormats from "@/shared-modules/sd-date-formats";
import { DateField } from "@mui/x-date-pickers";
import { isValid } from "date-fns";
import { de } from "date-fns/locale";
import PropTypes from "prop-types";
import { Controller, useFormContext } from "react-hook-form";

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

	if (!name) {
		return (
			<DateField
				defaultValue={defaultValue}
				label={label}
				readOnly={readOnly}
				onChange={_onChange}
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
					InputProps={{
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
