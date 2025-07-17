import BankPicker from "@/components/BankPicker/BankPicker";
import EmployeePicker from "@/components/picker/EmployeePicker";
import FormBox from "@/shared-components/form/FormBox";
import { ResponsiveGrid } from "@/shared-components/responsive-grid/ResponsiveGrid";
import { TextFieldWrapper } from "@/shared-components/TextFieldEx/TextFieldWrapper";
import { memo } from "react";
import AreaPicker from "../form/fields/AreaPicker";
import PaymentPicker from "../../../PaymentPicker/PaymentPickerContainer";

const A06SearchForm = memo((props) => {
	const { ...rest } = props;
	return (
		<FormBox>
			<ResponsiveGrid container spacing={1} columns={24} {...rest} >
				<ResponsiveGrid item xs={24} sm={24} md={4}>
					<TextFieldWrapper
						autoFocus
						name="lvId"
						label="客戶編號"
						variant="outlined"
						size="small"
						fullWidth
						clearable
					/>
				</ResponsiveGrid>
				<ResponsiveGrid item xs={24} sm={24} md={4}>
					<TextFieldWrapper
						name="lvName"
						label="客戶名稱"
						variant="outlined"
						size="small"
						fullWidth
						clearable
					/>
				</ResponsiveGrid>
				<ResponsiveGrid item xs={24} sm={24} md={4}>
					<EmployeePicker
						label="業務員"
						name="lvEmployee"
						virtualize
						disableOpenOnInput
						selectOnFocus
					/>
				</ResponsiveGrid>
				<ResponsiveGrid item xs={24} sm={24} md={4}>
					<AreaPicker
						label="區域"
						name="lvArea"
						virtualize
						disableOpenOnInput
						selectOnFocus
					/>
				</ResponsiveGrid>
				<ResponsiveGrid item xs={24} sm={24} md={4}>
					<PaymentPicker
						label="收款方式"
						name="lvPaymentType"
						disableOpenOnInput
						selectOnFocus
					/>
				</ResponsiveGrid>
				<ResponsiveGrid item xs={24} sm={24} md={4}>
					<BankPicker
						name="lvBank"
						label="銀行"
						disableOpenOnInput
						selectOnFocus
					/>
				</ResponsiveGrid>
			</ResponsiveGrid>
		</FormBox>
	);
})

A06SearchForm.propTypes = {

}

A06SearchForm.displayName = "A06SearchForm";
export default A06SearchForm;