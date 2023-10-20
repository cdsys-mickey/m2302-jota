import { Controller } from "react-hook-form";
import FilesField from "@/shared-components/FilesField";

const ControlledFilesField = ({ name, rules, defaultValue = [], ...rest }) => {
	// const { setValue } = useFormContext();

	return (
		<Controller
			name={name}
			rules={rules}
			defaultValue={defaultValue}
			render={({
				field: { ref, value, onChange },
				fieldState: { error },
			}) => (
				<FilesField
					id={name}
					value={value}
					onChange={onChange}
					{...rest}
				/>
			)}
		/>
	);
};

export default ControlledFilesField;
