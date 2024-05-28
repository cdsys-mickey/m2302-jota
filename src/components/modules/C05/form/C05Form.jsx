import { SupplierPickerContainer } from "@/components/picker/SupplierPickerContainer";
import Fieldset from "@/shared-components/Fieldset";
import FlexGrid from "@/shared-components/FlexGrid";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import FormBox from "@/shared-components/form/FormBox";
import { OptionPickerProvider } from "@/shared-components/picker/listbox/OptionPickerProvider";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import Colors from "../../../../modules/md-colors";
import { C05SearchButtonContainer } from "./C05SearchButtonContainer";

const C05Form = memo((props) => {
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
									label="廠商代碼"
									name="supplier"
									virtualize
									optionLabelSize="small"
								/>
							</OptionPickerProvider>
						</Grid>
						<Grid item xs={24} sm={5}>
							<DatePickerWrapper
								name="date1"
								label="退貨日期"
								fullWidth
							/>
						</Grid>

						<FlexGrid
							item
							xs={24}
							sm={5}
							justifyContent="center"
							alignItems="center">
							<C05SearchButtonContainer
								variant="contained"
								size="medium"
								// fullWidth
							/>
						</FlexGrid>
					</Grid>
				</FormBox>
			</Fieldset>
		</form>
	);
});

C05Form.propTypes = {
	onSubmit: PropTypes.func,
};

C05Form.displayName = "C05Form";
export default C05Form;
