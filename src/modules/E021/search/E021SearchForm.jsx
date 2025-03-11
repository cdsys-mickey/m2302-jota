import EmployeePicker from "@/components/picker/EmployeePicker";
import CheckboxExWrapper from "@/shared-components/checkbox/CheckboxExWrapper";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import FlexGrid from "@/shared-components/FlexGrid";
import FormBox from "@/shared-components/form/FormBox";
import { TextFieldWrapper } from "@/shared-components/text-field/TextFieldWrapper";
import { memo } from "react";
import { E021CustomerPicker } from "../E021CustomerPicker";
import E021SalesTypePicker from "../E021SalesTypePicker";
import { ResponsiveGrid } from "@/shared-components/responsive-grid/ResponsiveGrid";
import FlexBox from "@/shared-components/FlexBox";

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
							label="零售"
							placeholder="零售客戶?"
						/>
					</ResponsiveGrid>
					<ResponsiveGrid item xs={4}>
						<FlexBox justifyContent="flex-end">
							<CheckboxExWrapper
								label="零售"
								name="lvRetail"
							/>
						</FlexBox>
					</ResponsiveGrid>
					<ResponsiveGrid item xs={5}>
						<E021CustomerPicker
							name="lvCust"
							retailName="lvRetail"
							// label="客戶代碼"
							forId
							disableOpenOnInput
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

