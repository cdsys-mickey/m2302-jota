import FormBox from "@/shared-components/form/FormBox";
import { ResponsiveGrid } from "@/shared-components/responsive-grid/ResponsiveGrid";
import { memo } from "react";
import EmployeePicker from "@/components/picker/EmployeePicker";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import MatWasteOrderPicker from "@/components/picker/MatWasteOrderPicker";

const D05SearchForm = memo((props) => {
	const { ...rest } = props;
	return (
		<FormBox>
			<ResponsiveGrid container spacing={1} columns={24}>
				<ResponsiveGrid item md={6} lg={4}>
					<MatWasteOrderPicker
						label="報廢單號"
						name="lvOrder"
						autoFocus
						placeholder="輸入單號或數字"
						disableOpenOnInput
					/>
				</ResponsiveGrid>
				<ResponsiveGrid item md={6} lg={4} {...rest}>
					<DatePickerWrapper
						name="lvDate"
						label="報廢日期(≧)"
						clearable
						clearOnEscape
						validate
					/>
				</ResponsiveGrid>
				<ResponsiveGrid item md={6} lg={4}>
					<EmployeePicker
						name="lvEmployee" label="倉管人員"
						disableOpenOnInput
					/>
				</ResponsiveGrid>
			</ResponsiveGrid>
		</FormBox>
	);
})

D05SearchForm.propTypes = {

}

D05SearchForm.displayName = "D05SearchForm";
export default D05SearchForm;