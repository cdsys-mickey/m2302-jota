import CustomerPicker from "@/components/picker/CustomerPicker";
import ProdPicker from "@/components/picker/ProdPicker";
import { BContext } from "@/contexts/B/BContext";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import FormBox from "@/shared-components/form/FormBox";
import { Grid } from "@mui/material";
import { memo, useContext, useMemo } from "react";
import { B02OrderByPicker } from "../B02OrderByPicker";

const B02ListForm = memo((props) => {
	const { ...rest } = props;
	const b = useContext(BContext);
	const cust = useMemo(() => {
		return b.forNew ? "新客戶" : "客戶"
	}, [b.forNew])
	return (
		<FormBox {...rest}>
			<Grid container columns={24} spacing={1}>
				<Grid item xs={24} sm={24} md={6}>
					<CustomerPicker
						name="customer"
						forNew={b.forNew}
						autoFocus
						label={`${cust}代碼起`}
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
						forNew={b.forNew}
						name="customer2"
						label={`${cust}代碼訖`}
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
						validate
					// dense
					/>
				</Grid>
				<Grid item xs={24} sm={24} md={6}>
					<DatePickerWrapper
						name="date2"
						label="報價日期訖"
						clearable
						validate
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
