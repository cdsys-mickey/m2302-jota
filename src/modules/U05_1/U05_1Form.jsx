import ContainerEx from "@/shared-components/ContainerEx";
import FormBox from "@/shared-components/form/FormBox";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";

import { PrintReportButton } from "@/components";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import { FlexBox } from "shared-components";
import RangeGroup from "@/shared-components/RangeGroup";
import U05_1DataTypePicker from "./picker/U05_1DataTypePicker";

const U05_1Form = memo((props) => {
	const { onSubmit, onDebugSubmit, ...rest } = props;
	return (
		<ContainerEx maxWidth="xs" alignLeft>
			<form onSubmit={onSubmit} {...rest}>
				<FormBox pt={1}>
					<FormSectionBox editing>
						<Grid container columns={12} spacing={1}>
							<Grid item xs={12} sm={12}>
								<RangeGroup legend="交易日期"
									leftComponent={
										<DatePickerWrapper
											minDate={"2026/01/01"}
											name="SDate"
											label="日期區間"
											fullWidth
											validate
											clearable
											borderless
											placeholder="起"
										/>
									}
									rightComponent={
										<DatePickerWrapper
											minDate={"2026/01/01"}
											name="EDate"
											label="日期區間迄"
											fullWidth
											validate
											clearable
											borderless
											placeholder="迄"
										/>
									}
								/>
							</Grid>

							<Grid item xs={12} sm={12}>
								<U05_1DataTypePicker
									name="RptType"
									label="報表類型"
									required
								/>
							</Grid>
							<Grid item xs={12} sm={12}>
								{/* <StdPrintOutputModePicker
									required
									name="outputType"
									label="執行方式"
								/> */}
							</Grid>
						</Grid>
						<FlexBox mt={1.5}>
							<Grid container spacing={1}>
								<Grid item xs={12} sm={12}>
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

U05_1Form.propTypes = {
	readWorking: PropTypes.bool,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	readFailed: PropTypes.bool,
	readError: PropTypes.object,
	onSubmit: PropTypes.func,
	onDebugSubmit: PropTypes.func,
};

U05_1Form.displayName = "U05_1Form";
export default U05_1Form;



