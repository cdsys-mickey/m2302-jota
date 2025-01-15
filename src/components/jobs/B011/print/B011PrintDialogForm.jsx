import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { memo } from "react";
import PropTypes from "prop-types";
import EmployeePicker from "@/components/picker/EmployeePicker";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import { B011OutputModePickerContainer } from "../dialog/toolbar/B011OutputModePickerContainer";

const B011PrintDialogForm = memo((props) => {
	const { onSubmit, ...rest } = props;
	return (
		<form onSubmit={onSubmit} {...rest}>
			<Box pt={1}>
				<Grid container spacing={2} columns={12}>
					<Grid item xs={12} sm={12} md={12}>
						<EmployeePicker
							label="報價人員"
							name="prtEmployee"
							autoFocus
							virtualize
							disableOpenOnInput
							selectOnFocus
							// disableClearable
							required
							rules={{
								required: "報價人員為必填"
							}}
						/>
					</Grid>
					<Grid item xs={12} sm={12} md={7}>
						<DatePickerWrapper
							name="prtDate"
							label="報價日期"
							clearable
							validate
						// dense
						/>
					</Grid>
					<Grid item xs={12} sm={12} md={5}>
						<B011OutputModePickerContainer label="列印格式" name="outputType" fullWidth />
					</Grid>
				</Grid>
			</Box>
		</form>
	);
})

B011PrintDialogForm.propTypes = {
	onSubmit: PropTypes.func
}

B011PrintDialogForm.displayName = "B011PrintDialogForm";
export default B011PrintDialogForm;