/* eslint-disable no-mixed-spaces-and-tabs */
import { Controller } from "react-hook-form";
import OptionPicker from "../picker/OptionPicker";
import PropTypes from "prop-types";
import { forwardRef } from "react";

export const ControlledOptionPicker = forwardRef((props, ref) => {
	const {
		name,
		disabled = false,
		control,
		// onChange: handleChange,
		rules,
		labelShrink = false,
		defaultValue = null,
		sx = [],
		...rest
	} = props;

	if (!name) {
		return <OptionPicker ref={ref} {...rest} />;
	}

	return (
		<Controller
			name={name}
			defaultValue={defaultValue}
			control={control}
			rules={rules}
			render={({
				field: { ref, value, onChange },
				fieldState: { error },
			}) => (
				<>
					<OptionPicker
						ref={ref}
						value={value}
						sx={[{}, ...(Array.isArray(sx) ? sx : [sx])]}
						onChange={onChange}
						disabled={disabled}
						InputLabelProps={{
							...(labelShrink && { shrink: true }),
						}}
						error={!!error}
						helperText={error?.message}
						{...rest}
					/>
				</>
			)}
		/>
	);
});
ControlledOptionPicker.displayName = "ControlledOptionPicker";
ControlledOptionPicker.propTypes = {
	name: PropTypes.string,
	disabled: PropTypes.bool,
	control: PropTypes.object,
	onChange: PropTypes.func,
	rules: PropTypes.object,
	labelShrink: PropTypes.bool,
	defaultValue: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.object,
	]),
	sx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
