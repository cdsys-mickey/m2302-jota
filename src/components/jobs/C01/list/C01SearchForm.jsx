import EmployeePicker from "@/components/picker/EmployeePicker";
import ProdLinePicker from "@/components/picker/ProdLinePicker";
import PurchaseReqOrderPicker from "@/components/picker/PurchaseReqOrderPicker";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import FormBox from "@/shared-components/form/FormBox";
import { ResponsiveGrid } from "@/shared-components/responsive-grid/ResponsiveGrid";
import { memo } from "react";

const C01SearchForm = memo((props) => {
	const { ...rest } = props;
	return (
		<FormBox>
			<ResponsiveGrid container columns={24} spacing={1} {...rest}>
				<ResponsiveGrid item md={5} lg={5}>
					<PurchaseReqOrderPicker
						label="請購單號(≧)"
						name="lvOrder"
						autoFocus
						placeholder="輸入單號或數字"
						disableOpenOnInput
					/>
				</ResponsiveGrid>
				<ResponsiveGrid item md={6} lg={5}>
					<DatePickerWrapper name="lvDate"
						label="請購日期(≧)"
						validate
						clearable
					// dense
					/>
				</ResponsiveGrid>
				<ResponsiveGrid item md={6} lg={5}>
					<ProdLinePicker
						name="lvPdline"
						label="請購部門"
						disableOpenOnInput
					// dense
					/>
				</ResponsiveGrid>
				<ResponsiveGrid item md={6} lg={5}>
					<EmployeePicker name="lvEmployee" label="請購人員" disableOpenOnInput
					// dense 
					/>
				</ResponsiveGrid>
			</ResponsiveGrid>
		</FormBox>

	);
})

C01SearchForm.propTypes = {

}

C01SearchForm.displayName = "C01SearchForm";
export default C01SearchForm;