import EmployeePicker from "@/components/picker/EmployeePicker";
import SupplierPicker from "@/components/picker/SupplierPicker";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import FormBox from "@/shared-components/form/FormBox";
import { ResponsiveGrid } from "@/shared-components/responsive-grid/ResponsiveGrid";
import { memo } from "react";
import C03ListModePicker from "../C03ReviewModePicker";
import PurchaseOrderPicker from "@/components/picker/PurchaseOrderPicker";
import SquaredPicker from "@/components/picker/SquaredPicker";
import SquaredPicker2 from "@/components/picker/SquaredPicker2";

const C03SearchForm = memo((props) => {
	const { ...rest } = props;
	return (
		<FormBox>
			<ResponsiveGrid container spacing={1} columns={24} {...rest}>
				<ResponsiveGrid item md={6} lg={4}>
					{/* 
					<TextFieldWrapper
						name="q"
						label="單號"
						size="small"
						fullWidth
						autoFocus
						clearable
						clearOnEscape
					/> */}
					<PurchaseOrderPicker
						label="採購單號"
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
						name="lvOrdDate"
						label="採購日期"
						clearable
					/>
				</ResponsiveGrid>
				<ResponsiveGrid item md={6} lg={4}>
					<DatePickerWrapper
						name="lvArrDate"
						label="預計到貨日期(≦)"
						clearable
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

				<ResponsiveGrid item md={6} lg={3}>
					<SquaredPicker2
						name="lvSquared"
						label="結清註記"
						clearable
					/>
				</ResponsiveGrid>
			</ResponsiveGrid>
		</FormBox >
	);
})

C03SearchForm.propTypes = {

}

C03SearchForm.displayName = "C03SearchForm";
export default C03SearchForm;