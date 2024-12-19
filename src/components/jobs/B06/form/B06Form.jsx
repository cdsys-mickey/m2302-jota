import ProdPicker from "@/components/picker/ProdPicker";
import SupplierPicker from "@/components/picker/SupplierPicker";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import FlexGrid from "@/shared-components/FlexGrid";
import FormBox from "@/shared-components/form/FormBox";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import { B06SearchButtonContainer } from "./B06SearchButtonContainer";
import { B06OrderByPicker } from "./fields/B06OrderByPicker";

const B06Form = memo(() => {
	return (
		<FormBox>
			<Grid container columns={24} spacing={1}>
				<Grid item xs={6}>
					<SupplierPicker
						label="廠商代碼起"
						name="supplier"
						virtualize
						optionLabelSize="md"
						disableOpenOnInput
						selectOnFocus
						slotProps={{
							paper: {
								sx: {
									width: 360,
								},
							},
						}}
					/>
				</Grid>
				<Grid item xs={6}>
					<SupplierPicker
						label="廠商代碼迄"
						name="supplier2"
						virtualize
						optionLabelSize="md"
						disableOpenOnInput
						selectOnFocus
						slotProps={{
							paper: {
								sx: {
									width: 360,
								},
							},
						}}
					/>
				</Grid>
				<Grid item xs={6}>
					<DatePickerWrapper
						name="date1"
						label="起始日期"
						fullWidth
						validate
						clearable
					/>
				</Grid>
				<Grid item xs={6}>
					<DatePickerWrapper
						name="date2"
						label="截止日期"
						fullWidth
						validate
						clearable
					/>
				</Grid>

				<Grid item xs={6}>
					<ProdPicker
						name="sprod"
						label="起始商品編號"
						size="small"
						virtualize
						optionLabelSize="md"
						typeToSearchText="以編號,條碼或名稱搜尋"
						disableOpenOnInput
						selectOnFocus
						slotProps={{
							paper: {
								sx: {
									width: 360,
								},
							},
						}}
					/>
				</Grid>
				<Grid item xs={6}>
					<ProdPicker
						name="eprod"
						label="截止商品編號"
						size="small"
						virtualize
						optionLabelSize="md"
						typeToSearchText="以編號,條碼或名稱搜尋"
						disableOpenOnInput
						selectOnFocus
						slotProps={{
							paper: {
								sx: {
									width: 360,
								},
							},
						}}
					/>
				</Grid>

				<Grid item xs={6}>
					<B06OrderByPicker name="orderBy" label="排序"
						disableOpenOnInput
						selectOnFocus />
				</Grid>
				<FlexGrid
					item

					xs={6}
					justifyContent="center"
					alignItems="center">
					<B06SearchButtonContainer
						variant="contained"
						size="medium"
						fullWidth
					/>
				</FlexGrid>
			</Grid>
		</FormBox>
	);
});

B06Form.propTypes = {
	onSubmit: PropTypes.func,
};

B06Form.displayName = "B06Form";
export default B06Form;
