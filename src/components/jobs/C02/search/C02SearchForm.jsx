import EmployeePicker from "@/components/picker/EmployeePicker";
import PurchaseReqOrderPicker from "@/components/picker/PurchaseReqOrderPicker";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import FormBox from "@/shared-components/form/FormBox";
import { ResponsiveGrid } from "@/shared-components/responsive-grid/ResponsiveGrid";
import { memo } from "react";
import ProdLinePicker from "@/components/picker/ProdLinePicker";

const C02SearchForm = memo((props) => {
	const { ...rest } = props;
	return (
		<FormBox>
			<ResponsiveGrid container spacing={1} columns={24} {...rest} >
				<ResponsiveGrid item md={6} lg={4}>
					<PurchaseReqOrderPicker
						label="請購單號"
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
					<DatePickerWrapper name="lvDate"
						label="請購日期(≧)"
						clearable
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
			</ResponsiveGrid>
		</FormBox>
	);
})

C02SearchForm.propTypes = {

}

C02SearchForm.displayName = "C02SearchForm";
export default C02SearchForm;