import EmployeePicker from "@/components/picker/EmployeePicker";
import CheckboxExWrapper from "@/shared-components/checkbox/CheckboxExWrapper";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import FlexGrid from "@/shared-components/FlexGrid";
import FormBox from "@/shared-components/form/FormBox";
import { TextFieldWrapper } from "@/shared-components/text-field/TextFieldWrapper";
import { Grid } from "@mui/material";
import { memo } from "react";
import { E021CustomerPicker } from "../E021CustomerPicker";
import E021SalesTypePicker from "../E021SalesTypePicker";

const E021ListForm = memo((props) => {
	const { ...rest } = props;
	return (

		<FormBox>
			<form {...rest}>
				<Grid container columns={24} spacing={1}>
					<Grid item xs={24} sm={24} md={4}>
						<TextFieldWrapper
							name="q"
							label="單號"
							size="small"
							clearable
							placeholder="請輸入片段"
						/>
					</Grid>
					<Grid item xs={24} sm={24} md={5}>
						<DatePickerWrapper
							name="lvSalesDate"
							label="銷貨日"
							clearable
							validate
						// dense
						/>
					</Grid>
					<Grid item xs={24} sm={24} md={5}>
						<DatePickerWrapper
							name="lvArrDate"
							label="到貨日≤"
							clearable
							validate
						// dense
						/>
					</Grid>
					<Grid item xs={24} sm={24} md={6}>
						<EmployeePicker
							name="lvEmployee"
							label="業務員"
							fullWidth
							disableOpenOnInput
							selectOnFocus
						/>
					</Grid>
					<Grid item xs={24} sm={24} md={4}>
						<E021SalesTypePicker
							name="lvSalesType"
							label="客戶類型"
							clearable
						/>
					</Grid>
					<FlexGrid item xs={24} sm={24} md={4} justifyContent="flex-end">
						<CheckboxExWrapper
							label="零售"
							name="lvRetail"
						/>
					</FlexGrid>
					<Grid item xs={24} sm={24} md={5}>
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
					</Grid>
					<Grid item xs={24} sm={24} md={5}>
						<TextFieldWrapper
							name="lvCustName"
							label="客戶名稱"
							size="small"
							clearable
							placeholder="請輸入客戶名稱片段"
							fullWidth
						/>
					</Grid>
					<Grid item xs={24} sm={24} md={6}>
						<TextFieldWrapper
							name="lvCompTel"
							label="電話"
							size="small"
							clearable
							placeholder="請輸入電話片段"
							fullWidth
						/>
					</Grid>


				</Grid>
			</form>
		</FormBox>

	);
})

E021ListForm.propTypes = {

}

E021ListForm.displayName = "E021ListForm";
export default E021ListForm;

