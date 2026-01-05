import CustomerPicker from "@/components/picker/CustomerPicker";
import RecvAcctRcptCustomerPicker from "@/components/RecvAccCustomerPicker/RecvAcctRcptCustomerPicker";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import FormBox from "@/shared-components/form/FormBox";
import { ResponsiveGrid } from "@/shared-components/responsive-grid/ResponsiveGrid";
import { TextFieldWrapper } from "@/shared-components/TextFieldEx/TextFieldWrapper";
import PropTypes from "prop-types";
import { memo } from "react";

const G02SearchForm = memo((props) => {
	const { onCustomerChange, ...rest } = props;
	return (
		<FormBox {...rest}>
			<ResponsiveGrid container spacing={1}>
				<ResponsiveGrid item lg={2.5}>
					<DatePickerWrapper
						minDate={"2026/01/01"}
						name="lvEDate"
						label="資料截止日 ≦"
						fullWidth
						validate
						clearable
					/>
				</ResponsiveGrid>
				<ResponsiveGrid item lg={2.5}>
					<CustomerPicker
						forNew
						// <RecvAccRcptCustomerPicker
						name="lvCustID"
						// label="客戶代碼"
						forId
						disableOpenOnInput
						onChanged={onCustomerChange}
						slotProps={{
							paper: {
								sx: {
									width: 360,
								},
							},
						}}
					/>
				</ResponsiveGrid>
				<ResponsiveGrid item lg={2.5}>
					<TextFieldWrapper
						name="lvCustName"
						label="客戶名稱"
						size="small"
						fullWidth
						clearable
					/>
				</ResponsiveGrid>
				<ResponsiveGrid item lg={2.5}>
					<TextFieldWrapper
						name="lvTel"
						label="客戶電話"
						size="small"
						fullWidth
						clearable
					/>
				</ResponsiveGrid>
				<ResponsiveGrid item lg={2}>
					<TextFieldWrapper
						name="lvID"
						label="單據號碼"
						size="small"
						fullWidth
						clearable
					/>
				</ResponsiveGrid>
			</ResponsiveGrid>
		</FormBox>
	);
})

G02SearchForm.propTypes = {
	onCustomerChange: PropTypes.func
}

G02SearchForm.displayName = "G02SearchForm";
export default G02SearchForm;
