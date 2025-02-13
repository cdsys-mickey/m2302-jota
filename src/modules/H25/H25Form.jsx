import StdPrintOutputModePicker from "@/components/std-print/StdPrintOutputModePicker";
import ContainerEx from "@/shared-components/ContainerEx";
import FlexGrid from "@/shared-components/FlexGrid";
import FormBox from "@/shared-components/form/FormBox";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import FlexToolbar from "@/shared-components/listview/toolbar/FlexToolbar";
import { ButtonGroup, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";

import DebugDialogButtonContainer from "@/components/debug/DebugDialogButtonContainer";
import ProdPicker from "@/components/picker/ProdPicker";
import ReportSubmitButtonContainer from "@/components/report/ReportSubmitButtonContainer";
import CheckboxExWrapper from "@/shared-components/checkbox/CheckboxExWrapper";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import SupplierPicker from "@/components/picker/SupplierPicker";
import FlexBox from "@/shared-components/FlexBox";

const H25Form = memo((props) => {
	const { onSubmit, onDebugSubmit, ...rest } = props;
	return (
		<ContainerEx maxWidth="sm" alignLeft>
			<form onSubmit={onSubmit} {...rest}>
				<FormBox pt={1}>
					<FormSectionBox editing>
						<Grid container columns={12} spacing={2}>
							<Grid item xs={12} sm={6}>
								<DatePickerWrapper
									name="ArrDate"
									label="預計到貨日"
									fullWidth
									validate
									clearable
									autoFocus
								/>
							</Grid>
							<FlexBox fullWidth />

							<Grid item xs={12} sm={6}>
								<SupplierPicker
									label="廠商區間"
									name="SFactID"
									virtualize
									disableOpenOnInput
									selectOnFocus
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<SupplierPicker
									label="廠商區間迄"
									name="EFactID"
									virtualize
									disableOpenOnInput
									selectOnFocus
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<ProdPicker
									name="SProdID"
									label="貨號區間"
									size="small"
									virtualize
									disableOpenOnInput
									selectOnFocus
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<ProdPicker
									name="EProdID"
									label="貨號區間迄"
									size="small"
									virtualize
									disableOpenOnInput
									selectOnFocus
								/>
							</Grid>
						</Grid>
						<FlexBox mt={1}>
							<Grid container spacing={2}>
								<FlexGrid item xs={12} sm={6} alignItems="center">
									<StdPrintOutputModePicker
										required
										name="outputType"
										label="執行方式"
									/>
								</FlexGrid>
								<Grid item xs={12} sm={6}>
									<FlexToolbar align="right">
										<ButtonGroup>
											<DebugDialogButtonContainer
												onClick={onDebugSubmit} />
											<ReportSubmitButtonContainer
												onClick={onSubmit} />
										</ButtonGroup>
									</FlexToolbar>
								</Grid>
							</Grid>
						</FlexBox>
					</FormSectionBox>
				</FormBox>
			</form>
		</ContainerEx>
	);
});

H25Form.propTypes = {
	readWorking: PropTypes.bool,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	readFailed: PropTypes.bool,
	readError: PropTypes.object,
	onSubmit: PropTypes.func,
	onDebugSubmit: PropTypes.func,
};

H25Form.displayName = "H25Form";
export default H25Form;



