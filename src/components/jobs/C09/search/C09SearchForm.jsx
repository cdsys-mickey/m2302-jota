import FormBox from "@/shared-components/form/FormBox";
import { memo } from "react";
import DeptPicker from "../../../picker/DeptPicker";
import EmployeePicker from "@/components/picker/EmployeePicker";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import { ResponsiveGrid } from "@/shared-components/responsive-grid/ResponsiveGrid";
import TransInOrderPicker from "@/components/picker/TransInOrderPicker";

const C08SearchForm = memo((props) => {
	const { ...rest } = props;
	return (
		<FormBox>
			<ResponsiveGrid container spacing={1} columns={24}>
				<ResponsiveGrid item xs={24} sm={24} md={6} lg={4}>
					<TransInOrderPicker
						label="撥入單號"
						name="lvOrder"
						autoFocus
						placeholder="輸入單號或數字"
						disableOpenOnInput
					/>
				</ResponsiveGrid>
				<ResponsiveGrid item xs={24} sm={24} md={6} lg={4}>
					<DatePickerWrapper
						name="lvTxiDate"
						label="撥入日期(大於)"
						validate
					/>
				</ResponsiveGrid>
				<ResponsiveGrid item xs={24} sm={24} md={6} lg={4}>
					<EmployeePicker name="lvEmployee" label="驗收人員" disableOpenOnInput />
				</ResponsiveGrid>
				<ResponsiveGrid item xs={24} sm={24} md={6} lg={4}>
					<DeptPicker
						name="lvDept"
						label="撥出門市"
						disableOpenOnInput
					/>
				</ResponsiveGrid>
			</ResponsiveGrid>
		</FormBox>
	);
})

C08SearchForm.propTypes = {

}

C08SearchForm.displayName = "C08SearchForm";
export default C08SearchForm;