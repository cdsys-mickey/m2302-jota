import StdPrintOutputModePicker from "@/components/std-print/StdPrintOutputModePicker";
import ContainerEx from "@/shared-components/ContainerEx";
import FlexGrid from "@/shared-components/FlexGrid";
import FormBox from "@/shared-components/form/FormBox";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";

import CounterPicker from "@/components/picker/CounterPicker";
import ProdCatLPicker from "@/components/picker/ProdCatLPicker";
import ProdCatMPicker from "@/components/picker/ProdCatMPicker";
import ProdCatSPicker from "@/components/picker/ProdCatSPicker";
import ProdPicker from "@/components/picker/ProdPicker";
import { PrintReportButton } from "@/components";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import FlexBox from "@/shared-components/FlexBox";
import RangeGroup from "@/shared-components/RangeGroup";
import DateFormats from "@/shared-modules/sd-date-formats";

const G04Form = memo((props) => {
	const { onSubmit, onDebugSubmit, ...rest } = props;
	return (
		<ContainerEx maxWidth="sm" alignLeft>
			<form onSubmit={onSubmit} {...rest} style={{ paddingBottom: "10rem" }}>
				<FormBox pt={1}>
					<FormSectionBox editing>
						<Grid container columns={12} spacing={2}>
							<Grid item xs={12} sm={6}>
								<DatePickerWrapper
									name="CutYM"
									label="資料年月"
									fullWidth
									validate
									clearable
									autoFocus
									views={["year", "month"]}
									format={DateFormats.DATEFNS_YEAR_AND_MONTH}
								/>
							</Grid>
							<FlexBox fullWidth />
							<Grid item xs={12} sm={12}>
								<RangeGroup legend="貨號區間"
									leftComponent={<ProdPicker
										name="SProdID"
										label="貨號區間"
										size="small"
										virtualize
										disableOpenOnInput
										selectOnFocus
										borderless
										placeholder="起"
									/>}
									rightComponent={<ProdPicker
										name="EProdID"
										label="貨號區間迄"
										size="small"
										virtualize
										disableOpenOnInput
										selectOnFocus
										borderless
										placeholder="迄"
									/>}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<ProdCatLPicker
									name="catL"
									disableOpenOnInput
									selectOnFocus
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<ProdCatMPicker
									name="catM"
									disableOpenOnInput
									selectOnFocus
									catLName="catL"
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<ProdCatSPicker
									name="catS"
									disableOpenOnInput
									selectOnFocus
									catMName="catM"
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<CounterPicker
									name="counter"
									disableOpenOnInput
									selectOnFocus
								/>
							</Grid>
						</Grid>
						<FlexBox mt={1}>
							<Grid container spacing={2}>
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

G04Form.propTypes = {
	readWorking: PropTypes.bool,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	readFailed: PropTypes.bool,
	readError: PropTypes.object,
	onSubmit: PropTypes.func,
	onDebugSubmit: PropTypes.func,
};

G04Form.displayName = "G04Form";
export default G04Form;






