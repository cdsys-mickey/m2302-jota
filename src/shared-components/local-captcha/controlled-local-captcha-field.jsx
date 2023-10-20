import { Controller } from "react-hook-form";
import LocalCaptcha from "./local-captcha";

export const ControlledLocalCaptchaField = ({
	name,
	onInputChange,
	...rest
}) => {
	return (
		<Controller
			name={name}
			render={({ field: { value, onChange } }) => (
				<LocalCaptcha
					value={value}
					onChange={(r) => {
						onChange(r);
					}}
					onInputChange={onInputChange}
					onRefresh={() => {
						onChange(false);
					}}
					{...rest}
				/>
			)}
		/>
	);
};
