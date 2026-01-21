import CustomerPicker from "@/components/picker/CustomerPicker";
import EmployeePicker from "@/components/picker/EmployeePicker";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import FormBox from "@/shared-components/form/FormBox";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";

const B011ListForm = memo((props) => {
	const { forNew = false, ...rest } = props;

	return (
		<FormBox {...rest}>
			<Grid container columns={24} spacing={1}>
				<Grid item md={6}>
					<CustomerPicker
						forNew={forNew}
						// sharedKey={forNew ? "retail-customer" : "customer"}
						name="lvCust"
						label={forNew ? "新客戶代碼" : "客戶代碼"}
						disableOpenOnInput
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
						forNewCustomer={forNew}
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

B011ListForm.propTypes = {
	forNew: PropTypes.bool
}

B011ListForm.displayName = "B011ListForm";
export default B011ListForm;