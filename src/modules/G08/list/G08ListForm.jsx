import CustomerPicker from "@/components/picker/CustomerPicker";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import FormBox from "@/shared-components/form/FormBox";
import { TextFieldWrapper } from "@/shared-components/TextFieldEx/TextFieldWrapper";
import { Grid } from "@mui/material";
import { memo } from "react";
import PropTypes from "prop-types";

const G08ListForm = memo((props) => {
	const { onCustomerChange, ...rest } = props;
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
						minDate={"2026/01/01"}
						name="lvAdjDate"
						label="調整日"
						clearable
						validate
					// dense
					/>
				</Grid>
				<Grid item md={5}>
					<CustomerPicker
						name="lvCust"
						// label="客戶代號"
						forId
						{...rest}
						disableOpenOnInput
						onChanged={onCustomerChange}
						slotProps={{
							paper: {
								sx: {
									width: 260,
								},
							},
						}}
					/>
				</Grid>
				<Grid item md={8}>
					<TextFieldWrapper
						name="lvCustName"
						label="客戶名稱"
						size="small"
						clearable
						placeholder="請輸入名稱片段"
						fullWidth
					/>
				</Grid>


			</Grid>
		</FormBox>

	);
})

G08ListForm.propTypes = {
	onCustomerChanged: PropTypes.func
}

G08ListForm.displayName = "G08ListForm";
export default G08ListForm;


