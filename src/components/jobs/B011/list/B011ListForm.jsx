import CustomerPicker from "@/components/picker/CustomerPicker";
import EmployeePicker from "@/components/picker/EmployeePicker";
import { B011Context } from "@/contexts/B011/B011Context";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import FormBox from "@/shared-components/form/FormBox";
import { Grid } from "@mui/material";
import { useContext } from "react";
import { memo } from "react";
import PropTypes from "prop-types";
import { B031Context } from "@/contexts/B031/B031Context";
import { BContext } from "@/contexts/B/BContext";
import { useMemo } from "react";

const B011ListForm = memo((props) => {
	const { forNew = false, ...rest } = props;
	const b = useContext(BContext);
	const b011 = useContext(b.forNew ? B031Context : B011Context);

	return (
		<FormBox {...rest}>
			<Grid container columns={24} spacing={1}>
				<Grid item xs={24} sm={24} md={6}>
					<CustomerPicker
						forNew={b.forNew}
						name="lvCust"
						label={b.forNew ? "新客戶代碼" : "客戶代碼"}
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
				<Grid item xs={24} sm={24} md={6}>
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
				<Grid item xs={24} sm={24} md={6}>
					<DatePickerWrapper
						name="lvDate"
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