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
import HotelPicker from "@/components/HotelPicker/HotelPicker";
import EmployeePicker from "@/components/picker/EmployeePicker";
import TourGroupPicker from "@/components/TourGroupPicker/TourGroupPicker";
import TourGuidePicker from "@/components/TourGuidePicker/TourGuidePicker";
import { CheckboxEx, DatePickerEx, FormFieldLabel, TextFieldEx } from "@/shared-components";
import FormBox from "@/shared-components/form/FormBox";
import FormErrorBox from "@/shared-components/form/FormErrorBox";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import { TextFieldWrapper } from "@/shared-components/TextFieldEx/TextFieldWrapper";
import { Container } from "@mui/material";
import PropTypes from "prop-types";
import P42CmsGridContainer from "../dialog/grid/P42CmsGridContainer";
import P42RangeGridContainer from "../dialog/grid/P42RangeGridContainer";
import CmsCalcTypes from "@/components/CmsCalcTypePicker/CmsCalTypes.mjs";

const CELL_HEIGHT = "26px"

const P42DialogForm = memo((props) => {
	const {
		data,
		readWorking,
		readError,
		itemDataReady,
		itemDataLoaded,
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
			{/* {readWorking && (
				<Container maxWidth="xs">
					<FlexBox justifyContent="center" minHeight="30em">
						<LoadingTypography iconSize="lg" variant="h5">
							讀取中...
						</LoadingTypography>
					</FlexBox>
				</Container>
			)} */}
			{readError && <FormErrorBox error={readError}  {...slotProps?.error} />}
			{!readError && (
				<FormBox pt={1}>
					<FormSectionBox >
						<Grid container columns={24} spacing={1}>
							<Grid item xs={12} sm={12} md={4}>
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

							<Grid item xs={12} sm={12} md={7}>
								<CmsBookingOrderPicker
									typo
									name="bookingOrder"
									label="預約單號"
									disableOpenOnInput
									cleared={false}
									slotProps={{
										paper: {
											sx: {
												width: 740,
											},
										},
									}}
								/>
							</Grid>
							<Grid item xs={12} md={8.5}>
								<FlexBox justifyContent="flex-end" alignItems="flex-end" height={36}>
									<FormFieldLabel
										name="CalcType"
										label="計算方式："
										inline
										stringify={CmsCalcTypes.getOptionLabel}
										emptyText="(尚未計算)"
									/>
								</FlexBox>
							</Grid>
						</Grid>
					</FormSectionBox>
					<FormSectionBox >
						<Grid container columns={24} spacing={1}>
							<Grid item xs={12} sm={12} md={8}>
								<TextFieldWrapper
									typo
									name="GrpName"
									label="團體名稱"
									fullWidth
									clearable
								// required
								// rules={{
								// 	required: "名稱為必填",
								// }}
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={4}>
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

							<Grid item xs={12} sm={12} md={4.5}>
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
							<Grid item xs={12} sm={12} md={4}>
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
									clearable
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={4}>
								<TextFieldEx
									typo
									name="CarQty"
									label="車數"
									fullWidth
									type="number"
									clearable
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={3.5}>
								<TextFieldWrapper
									typo
									name="PugAmt"
									label="提貨券金額"
									fullWidth
									type="number"
									clearable
								/>
							</Grid>
							{/* <FlexBox fullWidth /> */}
							<Grid item xs={12} sm={12} md={3}>
								<TextFieldWrapper
									typo
									name="CarNo"
									label="車號"
									fullWidth
									clearable
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={2.5}>
								<TextFieldWrapper
									typo
									name="DrvName"
									label="司機姓名"
									fullWidth
									clearable
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={3}>
								<TextFieldWrapper
									typo
									name="DrvTel"
									label="司機電話"
									fullWidth
									clearable
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={4}>
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
									clearable
								/>
							</Grid>
							{/* <FlexBox fullWidth /> */}
							<Grid item xs={12} sm={12} md={4}>
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
									clearable
								/>
							</Grid>

							<Grid item xs={12} sm={12} md={5.5}>
								<TextFieldWrapper
									typo
									name="CndTel"
									label="導遊電話"
									fullWidth
									clearable
								/>
							</Grid>
						</Grid>
					</FormSectionBox>
					{/* <FlexBox fullWidth /> */}
					<FormSectionBox >
						<Grid container columns={24} spacing={1}>
							<Grid item xs={12} sm={12} md={4}>
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

							<Grid item xs={12} sm={12} md={4}>
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
									name="HotelTotCms"
									label="區域佣金"
									fullWidth
									type="number"
									clearable
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={3.5}>
								<CheckboxEx
									typo
									// disabled={!editing}
									label="飯店佣金已發"
									name="HotelPay"
									variant="outlined"
									fullWidth
								/>
							</Grid>

							<Grid item xs={12} sm={12} md={12}>
								<TextFieldWrapper
									typo
									name="Remark"
									label="備註"
									fullWidth
								// multiline
								/>
							</Grid>
							{/* <FlexBox fullWidth /> */}
							<Grid item xs={12} sm={12} md={12}>
								<TextFieldWrapper
									typo
									name="SnRemark"
									label="旅行社簽約備註"
									fullWidth
								// multiline
								/>
							</Grid>
						</Grid>
					</FormSectionBox>
					<Grid container columns={24} spacing={1}>
						<Grid item md={24} lg={5.5} >
							<P42RangeGridContainer />
						</Grid>
						<Grid item md={24} lg={18.5}>
							<P42CmsGridContainer />
						</Grid>
					</Grid>
				</FormBox >
			)}
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




