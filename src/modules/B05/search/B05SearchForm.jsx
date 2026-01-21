import EmployeePicker from "@/components/picker/EmployeePicker";
import SupplierPicker from "@/components/picker/SupplierPicker";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import FormBox from "@/shared-components/form/FormBox";
import { ResponsiveGrid } from "@/shared-components/responsive-grid/ResponsiveGrid";
import { TextFieldWrapper } from "@/shared-components/TextFieldEx/TextFieldWrapper";
import { memo } from "react";

const B05SearchForm = memo((props) => {
	const { ...rest } = props;
	return (
		<FormBox>
			<ResponsiveGrid container spacing={1}>
				<ResponsiveGrid item lg={3}>
					{/* <B05SearchFieldContainer label="" name="q" /> */}
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
				<ResponsiveGrid item lg={3}>
					<SupplierPicker
						label="廠商代碼"
						name="lvSupplier"
						virtualize
						optionLabelSize="md"
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
				<ResponsiveGrid item lg={3}>
					<DatePickerWrapper name="lvDate"
						label="詢價日期"
						fullWidth
						validate
						clearable
					/>
				</ResponsiveGrid>
				<ResponsiveGrid item lg={3}>
					<EmployeePicker
						label="詢價人員"
						name="lvEmployee"
						virtualize
						disableOpenOnInput
						selectOnFocus
					/>
				</ResponsiveGrid>
			</ResponsiveGrid>
		</FormBox>
	);
})

B05SearchForm.propTypes = {

}

B05SearchForm.displayName = "B05SearchForm";
export default B05SearchForm;