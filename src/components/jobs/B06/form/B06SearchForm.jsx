import ProdPicker from "@/components/picker/ProdPicker";
import SupplierPicker from "@/components/picker/SupplierPicker";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import FormBox from "@/shared-components/form/FormBox";
import { ResponsiveGrid } from "@/shared-components/responsive-grid/ResponsiveGrid";
import PropTypes from "prop-types";
import { memo } from "react";
import { B06OrderByPicker } from "./fields/B06OrderByPicker";
import ResponsiveLineBreak from "@/shared-components/responsive-grid/ResponsiveLineBreak";
import RangeGroup from "@/shared-components/RangeGroup";

const B06SearchForm = memo(() => {
	return (
		<FormBox pt={0.5}>
			<ResponsiveGrid container columns={24} spacing={1.5}>
				<ResponsiveGrid item md={12} lg={10}>
					<RangeGroup legend="廠商區間"
						leftComponent={<SupplierPicker
							autoFocus
							label="廠商區間"
							name="lvSupplier"
							virtualize
							disableOpenOnInput
							selectOnFocus
							borderless
							placeholder="起"
							slotProps={{
								paper: {
									sx: {
										width: 360,
									},
								},
							}}
						/>}

						rightComponent={<SupplierPicker
							label="廠商區間迄"
							name="lvSupplier2"
							virtualize
							disableOpenOnInput
							selectOnFocus
							borderless
							placeholder="迄"
							slotProps={{
								paper: {
									sx: {
										width: 360,
									},
								},
							}}
						/>}
					/>
				</ResponsiveGrid>
				<ResponsiveGrid item md={12} lg={8}>
					<RangeGroup legend="日期區間"
						leftComponent={
							<DatePickerWrapper name="date1"
								label="日期區間"
								fullWidth
								validate
								clearable
								borderless
								placeholder="起"
							/>
						}
						rightComponent={
							<DatePickerWrapper name="date2"
								label="日期區間迄"
								fullWidth
								validate
								clearable
								borderless
								placeholder="迄"
							/>
						}
					/>
				</ResponsiveGrid>
				<ResponsiveLineBreak />
				<ResponsiveGrid item md={12} lg={10}>
					<RangeGroup legend="貨號區間"
						leftComponent={<ProdPicker
							name="sprod"
							label="貨號區間"
							size="small"
							virtualize
							disableOpenOnInput
							selectOnFocus
							borderless
							placeholder="起"
							slotProps={{
								paper: {
									sx: {
										width: 360,
									},
								},
							}}
						/>}
						rightComponent={<ProdPicker
							name="eprod"
							label="貨號區間迄"
							size="small"
							virtualize
							disableOpenOnInput
							selectOnFocus
							borderless
							placeholder="迄"
							slotProps={{
								paper: {
									sx: {
										width: 360,
									},
								},
							}}
						/>}
					/>
				</ResponsiveGrid>

				<ResponsiveGrid item md={6} lg={4}>
					<B06OrderByPicker name="orderBy" label="排序"
						disableOpenOnInput
						selectOnFocus />
				</ResponsiveGrid>
			</ResponsiveGrid>
		</FormBox >
	);
});

B06SearchForm.propTypes = {
	onSubmit: PropTypes.func,
};

B06SearchForm.displayName = "B06SearchForm";
export default B06SearchForm;
