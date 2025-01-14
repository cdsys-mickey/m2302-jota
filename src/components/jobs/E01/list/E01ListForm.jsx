import EmployeePicker from "@/components/picker/EmployeePicker";
import CheckboxExWrapper from "@/shared-components/checkbox/CheckboxExWrapper";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import FlexGrid from "@/shared-components/FlexGrid";
import FormBox from "@/shared-components/form/FormBox";
import { TextFieldWrapper } from "@/shared-components/text-field/TextFieldWrapper";
import { Grid } from "@mui/material";
import { memo } from "react";
import { E01CustomerPicker } from "../E01CustomerPicker";
import E01SalesTypePicker from "../E01SalesTypePicker";
import E01ListSquaredPicker from "./E01ListSquaredPicker";

const E01ListForm = memo((props) => {
	const { ...rest } = props;
	return (
		<FormBox {...rest}>
			<Grid container columns={24} spacing={1}>
				<Grid item md={5}>
					<TextFieldWrapper
						autoFocus
						name="q"
						label="單號"
						size="small"
						clearable
						placeholder="請輸入單號片段"
					/>
				</Grid>
				<Grid item md={5}>
					<DatePickerWrapper
						name="lvOrdDate"
						label="訂貨日"
						clearable
						validate
					// dense
					/>
				</Grid>
				<Grid item md={5}>
					<DatePickerWrapper
						name="lvArrDate"
						label="到貨日≤"
						clearable
						validate
					// dense
					/>
				</Grid>
				<Grid item md={4}>
					<E01ListSquaredPicker
						name="lvSquared"
						label="結清註記"
						clearable
					/>
				</Grid>
				<Grid item md={5}>
					<EmployeePicker
						name="lvEmployee"
						label="業務員"
						fullWidth
						disableOpenOnInput
						selectOnFocus
					/>
				</Grid>
				<Grid item md={5}>
					<E01SalesTypePicker
						name="lvSalesType"
						label="客戶類型"
					/>
				</Grid>
				<FlexGrid item md={3} justifyContent="flex-end">
					<CheckboxExWrapper
						label="零售"
						name="lvRetail"
					/>
				</FlexGrid>
				<Grid item md={5}>
					<E01CustomerPicker
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
				<Grid item md={6}>
					<TextFieldWrapper
						name="lvCustName"
						label="客戶名稱"
						size="small"
						clearable
						placeholder="請輸入名稱片段"
						fullWidth
					/>
				</Grid>
				<Grid item md={5}>
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
		</FormBox>

	);
})

E01ListForm.propTypes = {

}

E01ListForm.displayName = "E01ListForm";
export default E01ListForm;
