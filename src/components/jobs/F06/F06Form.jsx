import { PrintReportButton } from "@/components";
import AccountingEntryListingPicker from "@/components/picker/AccountingEntryListingPicker";
import ContainerEx from "@/shared-components/ContainerEx";
import { FlexBox } from "shared-components";
import FormBox from "@/shared-components/form/FormBox";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import { TextFieldWrapper } from "@/shared-components/TextFieldEx/TextFieldWrapper";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import F06DataTypePicker from "./picker/F06DataTypePicker";

const F06Form = memo((props) => {
	const { onSubmit, onDebugSubmit, ...rest } = props;
	return (
		<ContainerEx maxWidth="xs" alignLeft>
			<form onSubmit={onSubmit} {...rest}>
				<FormBox pt={1}>
					<FormSectionBox editing>
						<Grid container columns={12} spacing={1}>
							<Grid item xs={12}>
								<AccountingEntryListingPicker
									label="盤點作帳日期#序號 清單編號"
									name="accEntry"
									autoFocus
									required
									rules={{
										required: "盤點作帳日期為必填"
									}}
								/>
							</Grid>

							<Grid item xs={12} sm={12}>
								<F06DataTypePicker
									name="PrtType"
									label="報表型態"
									required
								/>
							</Grid>
							<FlexBox fullWidth />
							<Grid item xs={12} sm={12}>
								<TextFieldWrapper
									typo
									editing={false}
									size="small"
									name="PhyIDs"
									label="盤點清單"
									// inline
									required
									readOnly
									slotProps={{
										"label": {
											sx: {
												marginTop: "-8px",
												marginLeft: "4px"
											}
										}
									}}
								/>
							</Grid>
							<Grid item xs={12}>
								<FlexBox justifyContent="flex-end">
									<PrintReportButton
										color="primary"
										variant="contained"
										onSubmit={onSubmit}
										onDebugSubmit={onDebugSubmit}
									/>
								</FlexBox>
							</Grid>
						</Grid>
					</FormSectionBox>
				</FormBox>
			</form>
		</ContainerEx>
	);
});

F06Form.propTypes = {
	onSubmit: PropTypes.func,
	onDebugSubmit: PropTypes.func,
	readWorking: PropTypes.bool,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	readFailed: PropTypes.bool,
	readError: PropTypes.object,
};

F06Form.displayName = "F06Form";
export default F06Form;

