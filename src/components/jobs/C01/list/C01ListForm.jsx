import EmployeePicker from "@/components/picker/EmployeePicker";
import ProdLinePicker from "@/components/picker/ProdLinePicker";
import PurchaseReqOrderPicker from "@/components/picker/PurchaseReqOrderPicker";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import FormBox from "@/shared-components/form/FormBox";
import { Grid } from "@mui/material";
import { memo } from "react";

const C01ListForm = memo((props) => {
	const { ...rest } = props;
	return (
		<FormBox>
			<Grid container columns={24} spacing={1}>
				{/* <Grid item xs={24} sm={4}>

					<C01ListModePicker
						// dense
						label="篩選"
						name="listMode"
						placeholder="篩選模式"
						disableClearable
						autoComplete
						autoSelect
						blurOnSelect
					/>
				</Grid> */}
				<Grid item xs={24} sm={5}>
					<PurchaseReqOrderPicker
						label="請購單號 (≧)"
						name="reqOrder"
						autoFocus
						placeholder="輸入單號或數字"
						disableOpenOnInput
					/>
				</Grid>
				<Grid item xs={24} sm={5}>
					<DatePickerWrapper
						name="date"
						label="請購日期 (≧)"
						validate
						clearable
					// dense
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<ProdLinePicker
						name="pdline"
						label="請購部門"
						disableOpenOnInput
					// dense
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<EmployeePicker name="reqEmployee" label="請購人員" disableOpenOnInput
					// dense 
					/>
				</Grid>
			</Grid>
		</FormBox>

	);
})

C01ListForm.propTypes = {

}

C01ListForm.displayName = "C01ListForm";
export default C01ListForm;