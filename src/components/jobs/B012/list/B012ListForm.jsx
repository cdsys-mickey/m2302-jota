import CustomerPicker from "@/components/picker/CustomerPicker";
import EmployeePicker from "@/components/picker/EmployeePicker";
import ProdPicker from "@/components/picker/ProdPicker";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import FormBox from "@/shared-components/form/FormBox";
import { Grid } from "@mui/material";
import { memo } from "react";

const B012ListForm = memo((props) => {
	const { ...rest } = props;
	return (
		<FormBox {...rest}>
			<Grid container columns={24} spacing={1}>

				<Grid item md={8}>
					<ProdPicker
						name="lvProd"
						// forId
						label="商品編號"
						autoFocus
						disableOpenOnInput
						virtualize
						withQuotes
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
					<EmployeePicker
						label="報價人員"
						name="lvEmployee"
						virtualize
						disableOpenOnInput
						selectOnFocus
						withQuotes
					// disableClearable
					/>
				</Grid>
				<Grid item md={6}>
					<DatePickerWrapper name="lvDate"
						label="報價日期"
						clearable
						validate
					// dense
					/>
				</Grid>
			</Grid>
		</FormBox>

	);
})

B012ListForm.propTypes = {

}

B012ListForm.displayName = "B012ListForm";
export default B012ListForm;
