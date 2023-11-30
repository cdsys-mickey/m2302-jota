/* eslint-disable no-mixed-spaces-and-tabs */
import { Controller } from "react-hook-form";
import WebApiOptionsPicker from "@/shared-components/picker/WebApiOptionsPicker";

export const ControlledWebApiOptionsPicker = ({
	name,
	disabled = false,
	control,
	required = false,
	rules,
	labelShrink = false,
	defaultValue = null,
	sx = [],
	...rest
}) => {
	return (
		<Controller
			name={name}
			defaultValue={defaultValue}
			control={control}
			rules={rules}
			render={({ field: { value, onChange }, fieldState: { error } }) => (
				<>
					<WebApiOptionsPicker
						name={name}
						required={required}
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
};
