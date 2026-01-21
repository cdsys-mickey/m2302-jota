import DeptPicker from "@/components/picker/DeptPicker";
import DeptRecvOrderPicker from "@/components/picker/DeptRecvOrderPicker";
import EmployeePicker from "@/components/picker/EmployeePicker";
import SquaredPicker from "@/components/picker/SquaredPicker";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import FormBox from "@/shared-components/form/FormBox";
import { ResponsiveGrid } from "@/shared-components/responsive-grid/ResponsiveGrid";
import { memo } from "react";

const C07SearchForm = memo((props) => {
	const { ...rest } = props;
	return (
		<FormBox>
			<ResponsiveGrid container spacing={1} columns={24} {...rest}>
				<ResponsiveGrid item sm={7} md={6} lg={4}>
					{/* <TextFieldWrapper
						name="q"
						label="單號"
						size="small"
						fullWidth
						autoFocus
						clearable
						clearOnEscape
					/> */}
					<DeptRecvOrderPicker
						label="門市訂貨單號"
						name="lvOrder"
						autoFocus
						placeholder="輸入單號或數字"
						disableOpenOnInput
					/>
				</ResponsiveGrid>
				<ResponsiveGrid item sm={7} md={6} lg={4}>
					<DatePickerWrapper name="lvOrdDate"
						label="訂貨日期"
						size="small"
						validate
					// slotProps={{
					// 	field: {
					// 		clearable: true,
					// 	},
					// }}
					/>
				</ResponsiveGrid>

				<ResponsiveGrid item sm={7} md={6} lg={4}>
					<DatePickerWrapper name="lvArrDate"
						label="預計到貨日期"
						validate
					/>
				</ResponsiveGrid>
				<ResponsiveGrid item sm={7} md={6} lg={4}>
					<DeptPicker
						name="lvDept"
						label="訂貨門市"
						disableOpenOnInput
					/>
				</ResponsiveGrid>
				<ResponsiveGrid item sm={7} md={6} lg={4}>
					<EmployeePicker name="lvEmployee" label="製單人員" disableOpenOnInput />
				</ResponsiveGrid>
				<ResponsiveGrid item sm={7} md={6} lg={4}>
					<SquaredPicker name="lvSquared" label="結清註記" disableOpenOnInput />
				</ResponsiveGrid>
			</ResponsiveGrid>
		</FormBox>
	);
})

C07SearchForm.propTypes = {

}

C07SearchForm.displayName = "C07SearchForm";
export default C07SearchForm;