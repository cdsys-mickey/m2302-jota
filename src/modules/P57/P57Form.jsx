import ContainerEx from "@/shared-components/ContainerEx";
import FormBox from "@/shared-components/form/FormBox";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";

import { PrintReportButton } from "@/components";
import CmsAreaPicker from "@/components/CmsAreaPicker/CmsAreaPicker";
import CmsBusCompPicker from "@/components/CmsBusCompPicker/CmsBusCompPicker";
import CmsCityPicker from "@/components/CmsCityPicker/CmsCityPicker";
import CmsCustTypePicker from "@/components/CmsCustTypePicker/CmsCustTypePicker";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import { FlexBox } from "shared-components";
import RangeGroup from "@/shared-components/RangeGroup";
import P57ReportTypePicker from "./pickers/P57ReportTypePicker";

const P57Form = memo((props) => {
	const { onSubmit, onDebugSubmit, ...rest } = props;
	return (
		<ContainerEx maxWidth="sm" alignLeft>
			<form onSubmit={onSubmit} {...rest} style={{ paddingBottom: "10rem" }}>
				<FormBox pt={1}>
					<FormSectionBox editing>
						<Grid container columns={12} spacing={1}>
							<Grid item xs={12} sm={12}>
								<RangeGroup legend="交易日期" required
									leftComponent={<DatePickerWrapper
										name="SDate"
										label="交易"
										fullWidth
										validate
										required
										clearable
										autoFocus
										borderless
										placeholder="起"
									/>}
									rightComponent={<DatePickerWrapper
										name="EDate"
										label="日期區間迄"
										fullWidth
										validate
										required
										clearable
										borderless
										placeholder="迄"
									/>}
								/>
							</Grid>
							<Grid item xs={12} sm={12}>
								<RangeGroup legend="縣市區域"
									leftComponent={<CmsAreaPicker

										name="SCtAreaID"
										borderless
									/>}
									rightComponent={<CmsAreaPicker
										name="ECtAreaID"
										borderless
									/>}
								/>
							</Grid>
							<Grid item xs={12} sm={12}>
								<RangeGroup legend="縣市"
									leftComponent={<CmsCityPicker
										name="SCityID"
										borderless
									/>}
									rightComponent={<CmsCityPicker
										name="ECityID"
										borderless
									/>}
								/>
							</Grid>
							<Grid item xs={12} sm={12}>
								<RangeGroup legend="車行區間"
									leftComponent={<CmsBusCompPicker
										name="SCarID"
										fullWidth
										borderless
										// forId
										// onChange={onBusCompChange}
										disableOpenOnInput
									/>}
									rightComponent={<CmsBusCompPicker
										name="ECarID"
										fullWidth
										borderless
										// forId
										// onChange={onBusCompChange}
										disableOpenOnInput
									/>}
								/>
							</Grid>
							<Grid item xs={12} sm={12}>
								<RangeGroup legend="客源"
									leftComponent={<CmsCustTypePicker
										name="SCustTID"
										label="客源型態"
										fullWidth
										disableOpenOnInput
										borderless
									/>}
									rightComponent={<CmsCustTypePicker
										name="ECustTID"
										label="客源型態"
										fullWidth
										disableOpenOnInput
										borderless
									/>}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<P57ReportTypePicker
									name="reportType"
									disableOpenOnInput
									selectOnFocus
								/>
							</Grid>
						</Grid>
						<FlexBox mt={2}>
							<Grid container spacing={1}>
								<Grid item xs={12} sm={6}>
									{/* <FlexBox alignItems="center">
										<StdPrintOutputModePicker
											required
											name="outputType"
											label="執行方式"
										/>
									</FlexBox> */}
								</Grid>
								<Grid item xs={12} sm={6}>
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
						</FlexBox>
					</FormSectionBox>
				</FormBox>
			</form>
		</ContainerEx>
	);
});

P57Form.propTypes = {
	readWorking: PropTypes.bool,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	readFailed: PropTypes.bool,
	readError: PropTypes.object,
	onSubmit: PropTypes.func,
	onDebugSubmit: PropTypes.func,
};

P57Form.displayName = "P57Form";
export default P57Form;








