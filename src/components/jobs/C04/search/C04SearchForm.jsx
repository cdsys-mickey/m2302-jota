import EmployeePicker from "@/components/picker/EmployeePicker";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import FormBox from "@/shared-components/form/FormBox";
import { ResponsiveGrid } from "@/shared-components/responsive-grid/ResponsiveGrid";
import { TextFieldWrapper } from "@/shared-components/TextFieldEx/TextFieldWrapper";
import { memo } from "react";
import SupplierPicker from "@/components/picker/SupplierPicker";
import DeptOrderPicker from "@/components/picker/DeptOrderPicker";
import RestockOrderPicker from "@/components/picker/RestockOrderPicker";

const C04SearchForm = memo((props) => {
	const { ...rest } = props;
	return (
		<FormBox>
			<ResponsiveGrid container spacing={1} columns={24} >
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
					<RestockOrderPicker
						label="進貨單號"
						name="lvOrder"
						autoFocus
						placeholder="輸入單號或數字"
						disableOpenOnInput
					/>
				</ResponsiveGrid>
				<ResponsiveGrid item md={6} lg={4}>
					<DatePickerWrapper
						name="lvRstDate"
						label="進貨日期(≧)"
						clearable
					/>
				</ResponsiveGrid>
				<ResponsiveGrid item md={6} lg={4}>
					<EmployeePicker
						name="lvEmployee"
						label="倉管人員"
						disableOpenOnInput
					/>
				</ResponsiveGrid>
				<ResponsiveGrid item md={6} lg={5}>
					<SupplierPicker
						name="lvSupplier"
						label="廠商代碼"
						virtualize
						disableOpenOnInput
						selectOnFocus
						slotProps={{
							paper: {
								sx: {
									width: 360,
								},
							},
						}}
					/>
				</ResponsiveGrid>
			</ResponsiveGrid>
		</FormBox>
	);
})

C04SearchForm.propTypes = {

}

C04SearchForm.displayName = "C04SearchForm";
export default C04SearchForm;