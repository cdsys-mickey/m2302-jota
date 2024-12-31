import EmployeePicker from "@/components/picker/EmployeePicker";
import MatBalanceOrderPicker from "@/components/picker/MatBalanceOrderPicker";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import FormBox from "@/shared-components/form/FormBox";
import { ResponsiveGrid } from "@/shared-components/responsive-grid/ResponsiveGrid";
import { memo } from "react";

const D06SearchForm = memo((props) => {
	const { ...rest } = props;
	return (
		<FormBox>
			<ResponsiveGrid container spacing={1} columns={24} {...rest}>
				<ResponsiveGrid item md={6} lg={4}>
					<MatBalanceOrderPicker
						label="結餘單號"
						name="lvOrder"
						autoFocus
						placeholder="輸入單號或數字"
						disableOpenOnInput
					/>
				</ResponsiveGrid>
				<ResponsiveGrid item md={6} lg={4}>
					<EmployeePicker
						name="lvEmployee"
						label="製單人員"
						disableOpenOnInput
					/>
				</ResponsiveGrid>
				<ResponsiveGrid item md={6} lg={4}>
					<DatePickerWrapper
						name="lvDate"
						label="結餘日期(≧)"
						validate
					/>
				</ResponsiveGrid>
			</ResponsiveGrid>
		</FormBox>
	);
})

D06SearchForm.propTypes = {

}

D06SearchForm.displayName = "D06SearchForm";
export default D06SearchForm;