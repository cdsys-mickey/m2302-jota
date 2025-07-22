import { Grid } from "@mui/material";
import { memo } from "react";

import FlexBox from "@/shared-components/FlexBox";
import LoadingTypography from "@/shared-components/LoadingTypography";

import CmsAreaPicker from "@/components/CmsAreaPicker/CmsAreaPicker";
import { CmsBookingOrderPicker } from "@/components/CmsBookingOrderPicker/CmsBookingOrderPicker";
import CmsBusCompPicker from "@/components/CmsBusCompPicker/CmsBusCompPicker";
import CmsCityPicker from "@/components/CmsCityPicker/CmsCityPicker";
import CmsCustTypePicker from "@/components/CmsCustTypePicker/CmsCustTypePicker";
import CmsGroupTypePicker from "@/components/CmsGroupTypePicker/CmsGroupTypePicker";
import TourGroupPicker from "@/components/TourGroupPicker/TourGroupPicker";
import TourGuidePicker from "@/components/TourGuidePicker/TourGuidePicker";
import EmployeePicker from "@/components/picker/EmployeePicker";
import { CheckboxEx, DatePickerEx, FlexTable, FlexTableCell, FlexTableRow, FormFieldLabel, TextFieldEx } from "@/shared-components";
import FormBox from "@/shared-components/form/FormBox";
import FormErrorBox from "@/shared-components/form/FormErrorBox";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import { TextFieldWrapper } from "@/shared-components/TextFieldEx/TextFieldWrapper";
import { Container } from "@mui/material";
import PropTypes from "prop-types";
import HotelPicker from "@/components/HotelPicker/HotelPicker";
import P42GridContainer from "../dialog/grid/P42RangeGridContainer";
import P42CmsGridContainer from "../dialog/grid/P42CmsGridContainer";
import P42CmsRow2View from "../dialog/grid/P42CmsRow2";

const CELL_HEIGHT = "26px"
const CELL_PROPS = {
	alignItems: "center",
	justifyContent: "flex-end",
	height: CELL_HEIGHT
}

const P42DialogForm = memo((props) => {
	const {
		data,
		readWorking,
		readError,
		itemDataReady,
		editing,
		updating,
		slotProps,
		onCityChange,
		onTourGuideChange,
		onTourGroupChange,
		onBusCompChange,
		cflagDisabled,
		...rest
	} = props;
	return (
		<form {...rest}>
			{readWorking && (
				<Container maxWidth="xs">
					<FlexBox justifyContent="center" minHeight="30em">
						<LoadingTypography iconSize="lg" variant="h5">
							讀取中...
						</LoadingTypography>
					</FlexBox>
				</Container>
			)}
			{readError && <FormErrorBox error={readError}  {...slotProps?.error} />}
			{itemDataReady && (
				<FormBox pt={1}>
					<FormSectionBox >
						<Grid container columns={24} spacing={1}>
							<Grid item xs={12} sm={12} md={3}>
								<TextFieldWrapper
									typo
									name="ComID"
									label="佣金單號"
									fullWidth
									disabled
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={4.5}>
								<DatePickerEx
									typo
									name="SalDate"
									label="交易日"
									autoFocus
									fullWidth
									required
									variant="outlined"
									validate
								/>
							</Grid>

							<Grid item xs={12} sm={12} md={6}>
								<CmsBookingOrderPicker
									typo
									name="bookingOrder"
									label="預約單號"
									disableOpenOnInput
									slotProps={{
										paper: {
											sx: {
												width: 740,
											},
										},
									}}
								/>
							</Grid>
						</Grid>
					</FormSectionBox>
					<FormSectionBox >
						<Grid container columns={24} spacing={1}>
							<Grid item xs={12} sm={12} md={7.5}>
								<TextFieldWrapper
									typo
									name="GrpName"
									label="團體名稱"
									fullWidth
								// required
								// rules={{
								// 	required: "名稱為必填",
								// }}
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={3}>
								<CmsCityPicker
									typo
									name="city"
									onChange={onCityChange}
									disableOpenOnInput
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={3.5}>
								<CmsAreaPicker
									typo
									name="area"
									disabled
									disableOpenOnInput
								/>
							</Grid>

							<Grid item xs={12} sm={12} md={3}>
								<CmsGroupTypePicker
									typo
									name="GrpType"
									label="種類"
									fullWidth
									disableOpenOnInput
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={4}>
								<CmsCustTypePicker
									typo
									name="custType"
									label="客源型態"
									fullWidth
									disableOpenOnInput
								/>
							</Grid>
						</Grid>
					</FormSectionBox>
					{/* <FlexBox fullWidth /> */}
					<FormSectionBox >
						<Grid container columns={24} spacing={1}>
							<Grid item xs={12} sm={12} md={3.5}>
								<CmsBusCompPicker
									typo
									name="busComp"
									label="車行"
									fullWidth
									forId
									onChange={onBusCompChange}
									disableOpenOnInput
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={4}>
								<TextFieldWrapper
									typo
									name="CarData_N"
									label="車行名稱"
									fullWidth
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={3}>
								<TextFieldWrapper
									typo
									name="CarQty"
									label="車數"
									fullWidth
									type="number"
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={3.5}>
								<TextFieldWrapper
									typo
									name="PugAmt"
									label="提貨券金額"
									fullWidth
									type="number"
								/>
							</Grid>
							{/* <FlexBox fullWidth /> */}
							<Grid item xs={12} sm={12} md={3}>
								<TextFieldWrapper
									typo
									name="CarNo"
									label="車號"
									fullWidth
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={2.5}>
								<TextFieldWrapper
									typo
									name="DrvName"
									label="司機姓名"
									fullWidth
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={4.5}>
								<TextFieldWrapper
									typo
									name="DrvTel"
									label="司機電話"
									fullWidth
								/>
							</Grid>
						</Grid>
					</FormSectionBox>
					{/* <FlexBox fullWidth /> */}
					<FormSectionBox >
						<Grid container columns={24} spacing={1}>

							<Grid item xs={12} sm={12} md={3.5}>
								<TourGroupPicker
									typo
									name="tourGroup"
									label="旅行社代號"
									fullWidth
									forId
									onChange={onTourGroupChange}
									disableOpenOnInput
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={4}>
								<TextFieldWrapper
									typo
									name="TrvData_N"
									label="旅行社名稱"
									fullWidth
								/>
							</Grid>
							{/* <FlexBox fullWidth /> */}
							<Grid item xs={12} sm={12} md={3}>
								<TourGuidePicker
									typo
									name="tourGuide"
									label="導遊代號"
									fullWidth
									forId
									onChange={onTourGuideChange}
									disableOpenOnInput
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={3.5}>
								<TextFieldWrapper
									typo
									name="CndName"
									label="導遊姓名"
									fullWidth
								/>
							</Grid>

							<Grid item xs={12} sm={12} md={5.5}>
								<TextFieldWrapper
									typo
									name="CndTel"
									label="導遊電話"
									fullWidth
								/>
							</Grid>
						</Grid>
					</FormSectionBox>
					{/* <FlexBox fullWidth /> */}
					<FormSectionBox >
						<Grid container columns={24} spacing={1}>
							<Grid item xs={12} sm={12} md={3.5}>
								<EmployeePicker
									typo
									name="employee"
									label="業務員"
									fullWidth
									disableOpenOnInput
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={4}>
								<EmployeePicker
									typo
									name="cashier"
									label="出納"
									fullWidth
									disableOpenOnInput
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={8}>
								<TextFieldWrapper
									typo
									name="Remark"
									label="備註"
									fullWidth
									multiline
								/>
							</Grid>
							{/* <FlexBox fullWidth /> */}
							<Grid item xs={12} sm={12} md={8.5}>
								<TextFieldWrapper
									typo
									name="SnRemark"
									label="旅行社簽約備註"
									fullWidth
									multiline
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={3.5}>
								<HotelPicker
									typo
									name="hotel"
									label="區域"
									fullWidth
									disableOpenOnInput
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={4}>
								<TextFieldWrapper
									typo
									name="HotelCms"
									label="區域佣金"
									fullWidth
									type="number"
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={3.5}>
								<CheckboxEx
									typo
									label="飯店佣金已發"
									name="HotelPay"
									variant="outlined"
									fullWidth
								/>
							</Grid>
						</Grid>
					</FormSectionBox>
					<Grid container columns={24} spacing={1}>
						<Grid item xs={24} sm={5.5}>
							<P42GridContainer />

						</Grid>
						<Grid item xs={24} sm={18.5}>
							<P42CmsGridContainer />

							<P42CmsRow2View mt={0.5} />
						</Grid>
					</Grid>
				</FormBox >
			)
			}
		</form >
	);
});

P42DialogForm.propTypes = {
	data: PropTypes.object,
	readWorking: PropTypes.bool,
	itemDataReady: PropTypes.bool,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	store: PropTypes.bool,
	readError: PropTypes.object,
	slotProps: PropTypes.object,
	onCityChange: PropTypes.func,
	onTourGuideChange: PropTypes.func,
	onTourGroupChange: PropTypes.func,
	onBusCompChange: PropTypes.func,
	cflagDisabled: PropTypes.bool
};

P42DialogForm.displayName = "P42Form";
export default P42DialogForm;




