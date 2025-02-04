import CustomerPicker from "@/components/picker/CustomerPicker";
import ProdPicker from "@/components/picker/ProdPicker";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import FormBox from "@/shared-components/form/FormBox";
import { Grid } from "@mui/material";
import { memo } from "react";
import E03SquaredPicker from "../E03SquaredPicker";
import CheckboxExWrapper from "@/shared-components/checkbox/CheckboxExWrapper";
import { TextFieldWrapper } from "@/shared-components/text-field/TextFieldWrapper";
import EmployeePicker from "@/components/picker/EmployeePicker";
import { E03CustomerPicker } from "../E03CustomerPicker";
import E03SalesTypePicker from "../E03SalesTypePicker";
import FlexGrid from "@/shared-components/FlexGrid";
import FlexBox from "@/shared-components/FlexBox";

const E03ListForm = memo((props) => {
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
				<Grid item md={6}>
					<DatePickerWrapper
						name="lvRtnDate"
						label="銷退日"
						clearable
						validate
					// dense
					/>
				</Grid>
				<Grid item md={6}>
					<EmployeePicker
						name="lvEmployee"
						label="業務員"
						fullWidth
						disableOpenOnInput
						selectOnFocus
					/>
				</Grid>
				<FlexBox fullWidth />
				<Grid item md={5}>
					<E03SalesTypePicker
						name="lvSalesType"
						label="零售"
						clearable
					/>
				</Grid>
				<FlexGrid item md={3} justifyContent="flex-end">
					<CheckboxExWrapper
						label="零售客戶"
						name="lvRetail"
					/>
				</FlexGrid>
				<Grid item md={5}>
					<E03CustomerPicker
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

E03ListForm.propTypes = {

}

E03ListForm.displayName = "E03ListForm";
export default E03ListForm;


