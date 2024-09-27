import CustomerPicker from "@/components/picker/CustomerPicker";
import ProdPicker from "@/components/picker/ProdPicker";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import FormBox from "@/shared-components/form/FormBox";
import { Grid } from "@mui/material";
import { memo } from "react";
import { B04OrderByPicker } from "../B04OrderByPicker";
import NewCustomerPicker from "@/components/picker/ZZNewCustomerPicker";

const B04ListForm = memo((props) => {
	const { ...rest } = props;
	return (
		<FormBox {...rest}>
			<Grid container columns={24} spacing={1}>
				<Grid item xs={24} sm={24} md={6}>
					<CustomerPicker
						forNew
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
						forNew
						name="customer2"
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
					<B04OrderByPicker
						name="orderBy"
						label="排序"
					/>
				</Grid>
			</Grid>
		</FormBox>

	);
})

B04ListForm.propTypes = {

}

B04ListForm.displayName = "B04ListForm";
export default B04ListForm;

