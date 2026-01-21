import FormBox from "@/shared-components/form/FormBox";
import { ResponsiveGrid } from "@/shared-components/responsive-grid/ResponsiveGrid";
import { memo } from "react";
import DeptPicker from "../../../picker/DeptPicker";
import EmployeePicker from "@/components/picker/EmployeePicker";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import TransportTypePicker from "../../../tranport-type-picker/TransportTypePicker";
import TransOutOrderPicker from "@/components/picker/TransOutOrderPicker";

const C08SearchForm = memo((props) => {
	const { ...rest } = props;
	return (
		<FormBox>
			<ResponsiveGrid container spacing={1} columns={24} {...rest}>
				<ResponsiveGrid item md={6} lg={4}>
					<TransOutOrderPicker
						label="撥出單號"
						name="lvOrder"
						autoFocus
						placeholder="輸入單號或數字"
						disableOpenOnInput
					/>
				</ResponsiveGrid>
				<ResponsiveGrid item md={5} lg={4}>
					<DatePickerWrapper name="lvTxoDate"
						label="撥出日期(>)"
						validate
					/>
				</ResponsiveGrid>
				<ResponsiveGrid item md={6} lg={4}>
					<EmployeePicker name="lvEmployee" label="倉管人員" disableOpenOnInput />
				</ResponsiveGrid>
				<ResponsiveGrid item md={5} lg={4}>
					<EmployeePicker
						name="lvDeliveryEmployee"
						label="配送人員"
						disableOpenOnInput
					/>
				</ResponsiveGrid>
				<ResponsiveGrid item md={6} lg={4}>
					<DeptPicker
						name="lvDept"
						label="撥入門市"
						disableOpenOnInput
					/>
				</ResponsiveGrid>
				<ResponsiveGrid item md={5} lg={4}>
					<TransportTypePicker
						name="lvTransType"
						label="貨運類別"
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