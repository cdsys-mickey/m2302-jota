import EmployeePicker from "@/components/picker/EmployeePicker";
import { CheckboxExField } from "@/shared-components";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import { FlexBox } from "shared-components";
import FormBox from "@/shared-components/form/FormBox";
import { ResponsiveGrid } from "@/shared-components/responsive-grid/ResponsiveGrid";
import { TextFieldWrapper } from "@/shared-components/TextFieldEx/TextFieldWrapper";
import { memo } from "react";
import { E021CustomerPicker } from "../ZZE021CustomerPicker";
import E021SalesTypePicker from "../E021SalesTypePicker";
import { AdaptiveCustomerPicker } from "@/shared-components/CustomerPicker/AdaptiveCustomerPicker";

const E021SearchForm = memo((props) => {
	const { ...rest } = props;
	return (

		<FormBox>
			<form {...rest}>
				<ResponsiveGrid container columns={24} spacing={1} initSize="xs">
					<ResponsiveGrid item xs={4}>
						<TextFieldWrapper
							autoFocus
							name="q"
							label="單號"
							size="small"
							clearable
							placeholder="請輸入片段"
						/>
					</ResponsiveGrid>
					<ResponsiveGrid item xs={5}>
						<DatePickerWrapper
							name="lvSalesDate"
							label="銷貨日"
							clearable
							validate
						// dense
						/>
					</ResponsiveGrid>
					<ResponsiveGrid item xs={5}>
						<DatePickerWrapper
							name="lvArrDate"
							label="到貨日≤"
							clearable
							validate
						// dense
						/>
					</ResponsiveGrid>
					<ResponsiveGrid item xs={6}>
						<EmployeePicker
							name="lvEmployee"
							label="業務員"
							fullWidth
							disableOpenOnInput
							selectOnFocus
						/>
					</ResponsiveGrid>
					<ResponsiveGrid item xs={4}>
						<E021SalesTypePicker
							name="lvSalesType"
							label="銷售類型"
							placeholder="空白=正式+零售客戶"
						/>
					</ResponsiveGrid>
					<ResponsiveGrid item xs={4}>
						<FlexBox justifyContent="flex-end">
							<CheckboxExField
								variant="outlined"
								fullWidth
								label="零售"
								name="lvRetail"
								size="small"
								slotProps={{
									label: {
										labelPlacement: "start"
									}
								}}
							/>
						</FlexBox>
					</ResponsiveGrid>
					<ResponsiveGrid item xs={5}>
						{/* <E021CustomerPicker */}
						<AdaptiveCustomerPicker
							name="lvCust"
							retailName="lvRetail"

							// label="客戶代碼"
							forId
							disableOpenOnInput
							// sharedKey="customer"
							slotProps={{
								paper: {
									sx: {
										width: 360,
									},
								},
							}}
						/>
					</ResponsiveGrid>
					<ResponsiveGrid item xs={5}>
						<TextFieldWrapper
							name="lvCustName"
							label="客戶名稱"
							size="small"
							clearable
							placeholder="請輸入名稱片段"
							fullWidth
						/>
					</ResponsiveGrid>
					<ResponsiveGrid item xs={6}>
						<TextFieldWrapper
							name="lvCompTel"
							label="電話"
							size="small"
							clearable
							placeholder="請輸入電話片段"
							fullWidth
						/>
					</ResponsiveGrid>


				</ResponsiveGrid>
			</form>
		</FormBox>

	);
})

E021SearchForm.propTypes = {

}

E021SearchForm.displayName = "E021SearchForm";
export default E021SearchForm;

