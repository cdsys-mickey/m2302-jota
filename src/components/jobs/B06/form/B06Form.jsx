import { Box, Grid } from "@mui/material";
import { memo } from "react";
import { ProdPickerContainer } from "@/components/picker/ProdPickerContainer";
import { OptionPickerProvider } from "@/shared-components/option-picker/OptionPickerProvider";
import { SupplierPickerContainer } from "@/components/picker/SupplierPickerContainer";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import { B06SearchButtonContainer } from "./B06SearchButtonContainer";
import FlexGrid from "@/shared-components/FlexGrid";
import { B06OrderByPicker } from "./fields/B06OrderByPicker";
import PropTypes from "prop-types";
import FormBox from "@/shared-components/form/FormBox";
import Fieldset from "@/shared-components/Fieldset";
import Colors from "../../../../modules/md-colors";

const B06Form = memo((props) => {
	const { onSubmit } = props;
	return (
		<form onSubmit={onSubmit}>
			<Fieldset
				// label="搜尋條件"
				labelSize="small"
				p={1}
				// pt={0}
				labelStyles={{
					fontWeight: 600,
				}}
				sx={{ backgroundColor: Colors.DIALOG_BG }}>
				<FormBox
					sx={
						{
							// backgroundColor: Colors.DIALOG_BG,
							// border: "1px solid grey",
						}
					}>
					<Grid container columns={24} spacing={1}>
						<Grid item xs={24} sm={7}>
							<OptionPickerProvider>
								<SupplierPickerContainer
									label="廠商代碼起"
									name="supplier"
									virtualize
									optionLabelSize="md"
								/>
							</OptionPickerProvider>
						</Grid>
						<Grid item xs={24} sm={7}>
							<OptionPickerProvider>
								<SupplierPickerContainer
									label="廠商代碼迄"
									name="supplier2"
									virtualize
									optionLabelSize="md"
								/>
							</OptionPickerProvider>
						</Grid>
						<Grid item xs={24} sm={5}>
							<DatePickerWrapper
								name="date1"
								label="起始日期"
								fullWidth
							/>
						</Grid>
						<Grid item xs={24} sm={5}>
							<DatePickerWrapper
								name="date2"
								label="截止日期"
								fullWidth
							/>
						</Grid>

						<Grid item xs={24} sm={7}>
							<OptionPickerProvider>
								<ProdPickerContainer
									name="sprod"
									label="起始商品編號"
									size="small"
									virtualize
									optionLabelSize="md"
									typeToSearchText="以編號,條碼或名稱搜尋"
								/>
							</OptionPickerProvider>
						</Grid>
						<Grid item xs={24} sm={7}>
							<OptionPickerProvider>
								<ProdPickerContainer
									name="eprod"
									label="截止商品編號"
									size="small"
									virtualize
									optionLabelSize="md"
									typeToSearchText="以編號,條碼或名稱搜尋"
								/>
							</OptionPickerProvider>
						</Grid>

						<Grid item xs={24} sm={5}>
							<B06OrderByPicker name="orderBy" label="排序" />
						</Grid>
						<FlexGrid
							item
							xs={24}
							sm={5}
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
			</Fieldset>
		</form>
	);
});

B06Form.propTypes = {
	onSubmit: PropTypes.func,
};

B06Form.displayName = "B06Form";
export default B06Form;
