import CustomerPicker from "@/components/picker/CustomerPicker";
import ProdPicker from "@/components/picker/ProdPicker";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import FormBox from "@/shared-components/form/FormBox";
import { Grid } from "@mui/material";
import { memo } from "react";

const B032ListForm = memo((props) => {
	const { ...rest } = props;
	return (
		<FormBox {...rest}>
			<Grid container columns={24} spacing={1}>

				<Grid item xs={24} sm={24} md={6}>
					<ProdPicker
						name="lvProd"
						// forId
						label="商品編號起"
						autoFocus
						disableOpenOnInput
						virtualize
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
					<ProdPicker
						name="lvProd2"
						// forId
						label="商品編號訖"
						autoFocus
						disableOpenOnInput
						virtualize
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
					<CustomerPicker
						name="lvCust"
						forNew
						label="新客戶代碼起"
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
				<Grid item xs={24} sm={24} md={6}>
					<CustomerPicker
						name="lvCust2"
						forNew
						label="新客戶代碼訖"
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

				<Grid item xs={24} sm={24} md={6}>
					<DatePickerWrapper
						name="lvDate"
						label="報價日期起"
						clearable
						validate
					// dense
					/>
				</Grid>
				<Grid item xs={24} sm={24} md={6}>
					<DatePickerWrapper
						name="lvDate2"
						label="報價日期訖"
						clearable
						validate
					// dense
					/>
				</Grid>
			</Grid>
		</FormBox>

	);
})

B032ListForm.propTypes = {

}

B032ListForm.displayName = "B032ListForm";
export default B032ListForm;

