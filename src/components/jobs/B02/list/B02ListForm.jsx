import CustomerPicker from "@/components/picker/CustomerPicker";
import ProdPicker from "@/components/picker/ProdPicker";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import FormBox from "@/shared-components/form/FormBox";
import { Grid } from "@mui/material";
import { memo } from "react";
import { B02OrderByPicker } from "../B02OrderByPicker";

const B02ListForm = memo((props) => {
	const { ...rest } = props;
	return (
		<FormBox {...rest}>
			<Grid container columns={24} spacing={1}>
				<Grid item xs={24} sm={24} md={6}>
					<CustomerPicker
						name="customer"
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
						name="customer2"
						label="客戶代碼訖"
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
					<ProdPicker
						name="prod"
						forId
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
						name="prod2"
						forId
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
					<DatePickerWrapper
						name="date"
						label="報價日期起"
						clearable
					// dense
					/>
				</Grid>
				<Grid item xs={24} sm={24} md={6}>
					<DatePickerWrapper
						name="date2"
						label="報價日期訖"
						clearable
					// dense
					/>
				</Grid>
				<Grid item xs={24} sm={24} md={6}>
					<B02OrderByPicker
						name="orderBy"
						label="排序"
					/>
				</Grid>
			</Grid>
		</FormBox>

	);
})

B02ListForm.propTypes = {

}

B02ListForm.displayName = "B02ListForm";
export default B02ListForm;
