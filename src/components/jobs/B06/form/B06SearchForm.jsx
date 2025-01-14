import ProdPicker from "@/components/picker/ProdPicker";
import SupplierPicker from "@/components/picker/SupplierPicker";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import FormBox from "@/shared-components/form/FormBox";
import { ResponsiveGrid } from "@/shared-components/responsive-grid/ResponsiveGrid";
import PropTypes from "prop-types";
import { memo } from "react";
import { B06OrderByPicker } from "./fields/B06OrderByPicker";
import ResponsiveLineBreak from "@/shared-components/responsive-grid/ResponsiveLineBreak";

const B06SearchForm = memo(() => {
	return (
		<FormBox>
			<ResponsiveGrid container columns={24} spacing={1}>
				<ResponsiveGrid item md={6} lg={5}>
					<SupplierPicker
						label="廠商代碼起"
						name="lvSupplier"
						autoFocus
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
				</ResponsiveGrid>
				<ResponsiveGrid item md={6} lg={5}>
					<SupplierPicker
						label="廠商代碼迄"
						name="lvSupplier2"
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
				</ResponsiveGrid>
				<ResponsiveGrid item md={6} lg={4}>
					<DatePickerWrapper
						name="date1"
						label="起始日期"
						fullWidth
						validate
						clearable
					/>
				</ResponsiveGrid>
				<ResponsiveGrid item md={6} lg={4}>
					<DatePickerWrapper
						name="date2"
						label="截止日期"
						fullWidth
						validate
						clearable
					/>
				</ResponsiveGrid>
				<ResponsiveLineBreak />
				<ResponsiveGrid item md={6} lg={5}>
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
				</ResponsiveGrid>
				<ResponsiveGrid item md={6} lg={5}>
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
				</ResponsiveGrid>

				<ResponsiveGrid item md={6} lg={4}>
					<B06OrderByPicker name="orderBy" label="排序"
						disableOpenOnInput
						selectOnFocus />
				</ResponsiveGrid>
				{/* <FlexGrid
					item
					md={6}
					justifyContent="center"
					alignItems="center">
					<B06SearchButtonContainer
						variant="contained"
						size="medium"
						fullWidth
					/>
				</FlexGrid> */}
			</ResponsiveGrid>
		</FormBox >
	);
});

B06SearchForm.propTypes = {
	onSubmit: PropTypes.func,
};

B06SearchForm.displayName = "B06SearchForm";
export default B06SearchForm;
