import EmployeePicker from "@/components/picker/EmployeePicker";
import { CheckboxExField } from "@/shared-components";
import { AdaptiveCustomerPicker } from "@/shared-components/CustomerPicker/AdaptiveCustomerPicker";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import FlexBox from "@/shared-components/FlexBox";
import FormBox from "@/shared-components/form/FormBox";
import { TextFieldWrapper } from "@/shared-components/TextFieldEx/TextFieldWrapper";
import { Grid } from "@mui/material";
import { memo } from "react";
import E03SalesTypePicker from "../E03SalesTypePicker";

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
						label="客戶類型"
						clearable
					/>
				</Grid>
				<Grid item md={8} >
					<FlexBox inline fullWidth gap={0.2}>
						<FlexBox justifyContent="flex-end">
							<CheckboxExField
								label="零售"
								name="lvRetail"
								size="small"
								variant="outlined"
							// fullWidth
							// slotProps={{
							// 	label: {
							// 		labelPlacement: "start"
							// 	}
							// }}
							/>
						</FlexBox>
						<FlexBox flex={1}>
							<AdaptiveCustomerPicker
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
						</FlexBox>
					</FlexBox>
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


