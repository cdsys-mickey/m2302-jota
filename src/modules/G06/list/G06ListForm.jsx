import CustomerPicker from "@/components/picker/CustomerPicker";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import FormBox from "@/shared-components/form/FormBox";
import { TextFieldWrapper } from "@/shared-components/TextFieldEx/TextFieldWrapper";
import { Grid } from "@mui/material";
import { memo } from "react";
import PropTypes from "prop-types";
import { RecvAcctRcptSessionPicker } from "@/components/RecvAccountSessionPicker/RecvAcctRcptSessionPicker";
import RecvAcctBatchCustomerPicker from "@/components/RecvAccCustomerPicker/RecvAcctBatchCustomerPicker";

const G06ListForm = memo((props) => {
	const { onCustomerChange, onSessionChange, ...rest } = props;
	return (
		<FormBox {...rest}>
			<Grid container columns={24} spacing={1}>
				<Grid item md={6}>
					<RecvAcctRcptSessionPicker
						name="lvSession"
						label="帳款年月+期別"
						fullWidth
						validate
						clearable
						autoFocus
						virtualize
						rules={{
							required: "帳款年月+期別為必填",
						}}
					// onChanged={onSessionChange}
					// disableClose
					/>
				</Grid>
				<Grid item md={8}>
					{/* <CustomerPicker */}
					<RecvAcctBatchCustomerPicker
						name="lvCust"
						// label="客戶代號"
						// forId
						// autoLabel 
						{...rest}
						disableOpenOnInput
						clearable
						onChanged={onCustomerChange}
					// slotProps={{
					// 	paper: {
					// 		sx: {
					// 			width: 260,
					// 		},
					// 	},
					// }}
					/>
				</Grid>
				{/* <Grid item md={8}>
					<TextFieldWrapper
						name="lvCustName"
						label="客戶名稱"
						size="small"
						clearable
						placeholder="請輸入名稱片段"
						fullWidth
					/>
				</Grid> */}


			</Grid>
		</FormBox>

	);
})

G06ListForm.propTypes = {
	onCustomerChange: PropTypes.func,
	onSessionChange: PropTypes.func
}

G06ListForm.displayName = "G06ListForm";
export default G06ListForm;


