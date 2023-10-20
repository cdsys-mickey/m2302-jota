import { Controller } from "react-hook-form";
import WebApiOptionsPicker from "@/shared-components/picker/WebApiOptionsPicker";

export const ControlledWebApiOptionsPicker = ({
	name,
	readOnly = false,
	control,
	onChange: handleChange,
	required = false,
	rules,
	labelShrink = false,
	defaultValue,
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
						required={required}
						value={value}
						sx={[{}, ...(Array.isArray(sx) ? sx : [sx])]}
						onChange={
							readOnly
								? null
								: (e) => {
										onChange(e.target.value);
										if (handleChange) {
											handleChange(e.target.value);
										}
								  }
						}
						disabled={readOnly}
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
