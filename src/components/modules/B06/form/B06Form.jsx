import { Box, Grid } from "@mui/material";
import { memo } from "react";
import { ProdPickerContainer } from "@/components/picker/ProdPickerContainer";
import { OptionPickerProvider } from "@/shared-components/picker/listbox/OptionPickerProvider";
import { SupplierPickerContainer } from "@/components/picker/SupplierPickerContainer";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import { B06SearchButtonContainer } from "./B06SearchButtonContainer";
import FlexGrid from "@/shared-components/FlexGrid";
import { B06OrderByPicker } from "./fields/B06OrderByPicker";
import PropTypes from "prop-types";
import FormBox from "@/shared-components/form/FormBox";

const B06Form = memo((props) => {
	const { onSubmit } = props;
	return (
		<form onSubmit={onSubmit}>
			<FormBox pt={1}>
				<Grid container columns={12} spacing={1}>
					<Grid item xs={12} sm={3}>
						<OptionPickerProvider>
							<SupplierPickerContainer
								label="廠商代碼起"
								name="supplier"
								virtualize
							/>
						</OptionPickerProvider>
					</Grid>
					<Grid item xs={12} sm={3}>
						<OptionPickerProvider>
							<SupplierPickerContainer
								label="廠商代碼迄"
								name="supplier2"
								virtualize
							/>
						</OptionPickerProvider>
					</Grid>

					<Grid item xs={12} sm={3}>
						<OptionPickerProvider>
							<ProdPickerContainer
								name="sprod"
								label="起始商品編號"
								size="small"
								virtualize
								// filterByServer
								// queryRequired
								typeToSearchText="以編號,條碼或名稱搜尋"
							/>
						</OptionPickerProvider>
					</Grid>
					<Grid item xs={12} sm={3}>
						<OptionPickerProvider>
							<ProdPickerContainer
								name="eprod"
								label="截止商品編號"
								size="small"
								virtualize
								// filterByServer
								// queryRequired
								typeToSearchText="以編號,條碼或名稱搜尋"
							/>
						</OptionPickerProvider>
					</Grid>
					<Grid item xs={12} sm={3}>
						<DatePickerWrapper
							name="date1"
							label="起始日期"
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} sm={3}>
						<DatePickerWrapper
							name="date2"
							label="截止日期"
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} sm={3}>
						<B06OrderByPicker name="orderBy" label="排序" />
					</Grid>
					<FlexGrid
						item
						xs={12}
						sm={3}
						justifyContent="flex-end"
						alignItems="center">
						<B06SearchButtonContainer variant="contained" />
					</FlexGrid>
				</Grid>
			</FormBox>
		</form>
	);
});

B06Form.propTypes = {
	onSubmit: PropTypes.func,
};

B06Form.displayName = "B06Form";
export default B06Form;
