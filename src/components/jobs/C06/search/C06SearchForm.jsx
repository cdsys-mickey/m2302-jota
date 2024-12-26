import DeptOrderPicker from "@/components/picker/DeptOrderPicker";
import DeptPicker from "@/components/picker/DeptPicker";
import EmployeePicker from "@/components/picker/EmployeePicker";
import SquaredPicker from "@/components/picker/SquaredPicker";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import FormBox from "@/shared-components/form/FormBox";
import { ResponsiveGrid } from "@/shared-components/responsive-grid/ResponsiveGrid";
import ResponsiveLineBreak from "@/shared-components/responsive-grid/ResponsiveLineBreak";
import { TextFieldWrapper } from "@/shared-components/text-field/TextFieldWrapper";
import { memo } from "react";

const C06SearchForm = memo((props) => {
	const { ...rest } = props;
	return (
		<FormBox>
			<ResponsiveGrid container spacing={1} columns={24} {...rest}>
				<ResponsiveGrid item md={6} lg={4}>
					{/* <TextFieldWrapper
						name="q"
						label="單號"
						size="small"
						fullWidth
						autoFocus
						clearable
						clearOnEscape
					/> */}
					<DeptOrderPicker
						label="門市訂貨單號"
						name="lvOrder"
						autoFocus
						placeholder="輸入單號或數字"
						disableOpenOnInput
					/>
				</ResponsiveGrid>
				<ResponsiveGrid item md={6} lg={4}>
					<DatePickerWrapper
						name="lvOrdDate"
						label="訂貨日期"
						clearable
					/>
				</ResponsiveGrid>
				<ResponsiveGrid item md={6} lg={4}>
					<DatePickerWrapper
						name="lvArrDate"
						label="到貨日期"
						clearable
					/>
				</ResponsiveGrid>
				<ResponsiveLineBreak md />
				<ResponsiveGrid item md={6} lg={4}>
					<SquaredPicker
						name="lvSquared"
						label="結清註記"
						clearable
					/>
				</ResponsiveGrid>
				<ResponsiveGrid item md={6} lg={4}>
					<DeptPicker
						name="lvDept"
						label="出貨門市"
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
			</ResponsiveGrid>
		</FormBox>
	);
})

C06SearchForm.propTypes = {

}

C06SearchForm.displayName = "C06SearchForm";
export default C06SearchForm;