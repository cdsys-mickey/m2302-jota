import EmployeePicker from "@/components/picker/EmployeePicker";
import FormBox from "@/shared-components/form/FormBox";
import { ResponsiveGrid } from "@/shared-components/responsive-grid/ResponsiveGrid";
import { TextFieldWrapper } from "@/shared-components/text-field/TextFieldWrapper";
import { memo } from "react";


const D07SearchForm = memo((props) => {
	const { ...rest } = props;
	return (
		<FormBox>
			<ResponsiveGrid container spacing={1} columns={24} {...rest}>
				<ResponsiveGrid item md={5} >
					<TextFieldWrapper
						name="q"
						label="單號"
						size="small"
						fullWidth
						autoFocus
						clearable
						clearOnEscape
					/>
				</ResponsiveGrid>
				<ResponsiveGrid item md={5} >
					<EmployeePicker
						name="lvEmployee"
						label="編輯人員"
						disableOpenOnInput
					/>
				</ResponsiveGrid>
			</ResponsiveGrid>
		</FormBox>
	);
})

D07SearchForm.propTypes = {

}

D07SearchForm.displayName = "D07SearchForm";
export default D07SearchForm;