import ProdTypeA from "@/modules/md-prod-type-a";
import TaxTypes from "@/modules/md-tax-types";
import { Box, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";

import Strings from "@/modules/md-strings";
import FlexBox from "@/shared-components/FlexBox";
import LoadingTypography from "@/shared-components/LoadingTypography";
import DialogEx from "@/shared-components/dialog/DialogEx";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import FormSectionTitle from "@/shared-components/form/FormSectionTitle";
import { TypoCheckboxExContainer } from "@/shared-components/typo/TypoCheckboxExContainer";
import TypoTextFieldContainer from "@/shared-components/typo/TypoTextFieldContainer";
import { Container } from "@mui/material";
import CmsTypes from "../../../../modules/md-cms-types";
import ProdLCats from "../../../../modules/md-prod-l-cats";
import ProdMCats from "../../../../modules/md-prod-m-cats";
import ProdSCats from "../../../../modules/md-prod-s-cats";
import ProdTypeB from "../../../../modules/md-prod-type-b";
import YesNo from "../../../../modules/md-yes-no";
import CmsTypePickerContainer from "../../../picker/CmsTypePickerContainer";
import ProdCatLPickerContainer from "../../../picker/ProdCatLPickerContainer";
import ProdCatMPickerContainer from "../../../picker/ProdCatMPickerContainer";
import ProdCatSPickerContainer from "../../../picker/ProdCatSPickerContainer";
import ProdTypeAPickerContainer from "../../../picker/ProdTypeAPickerContainer";
import ProdTypeBPickerContainer from "../../../picker/ProdTypeBPickerContainer";
import TaxTypePickerContainer from "../../../picker/TaxTypePickerContainer";
import { A01DialogTitleButtonsContainer } from "./buttons/A01DialogTitleButtonsContainer";
import PkyTypePickerContainer from "../../../picker/PkyTypePickerContainer";
import PkgTypes from "../../../../modules/md-pkg-types";
import Counters from "../../../../modules/md-counters";
import CounterPickerContainer from "../../../picker/CounterPickerContainer";

const A01Dialog = memo(
	forwardRef((props, ref) => {
		const { data, readWorking, dataLoaded, ...rest } = props;

		return (
			<DialogEx
				ref={ref}
				responsive
				fullWidth
				maxWidth="md"
				titleButtonsComponent={A01DialogTitleButtonsContainer}
				contentSx={{
					minHeight: "30em",
				}}
				{...rest}>
				{readWorking && (
					<Container maxWidth="xs">
						<FlexBox justifyContent="center" minHeight="30em">
							<LoadingTypography iconSize="lg" variant="h5">
								讀取中...
							</LoadingTypography>
						</FlexBox>
					</Container>
				)}
				{dataLoaded && (
					<Box pt={1}>
						<FormSectionTitle>基本資料</FormSectionTitle>
						<FormSectionBox
							// bgcolor="rgba(0, 0, 0, 0.02)"
							// borderLeft="5px solid rgb(16 160 215)"
							p={1}
							pt={0}
							mb={2}>
							<Grid container columns={12} spacing={1}>
								<Grid item xs={12} sm={12} md={3}>
									<TypoTextFieldContainer
										autoFocus
										fullWidth
										required
										label="貨品編號"
										name="ProdID"
										value={data?.ProdID}
									/>
								</Grid>
								<Grid item xs={12} sm={12} md={3}>
									<TypoTextFieldContainer
										label="條碼"
										name="Barcode"
										fullWidth
										value={data?.Barcode}
									/>
								</Grid>
								<Grid item xs={12} sm={12} md={3}>
									<TypoCheckboxExContainer
										label="列印條碼"
										name="BarPR">
										{YesNo.getOptionLabel(data?.BarPR)}
									</TypoCheckboxExContainer>
								</Grid>
								{/* <Grid item xs={12} sm={12} md={3}>
									<TypoTextFieldContainer
										label="簡碼"
										name="SimpleCode"
										fullWidth
										value={data?.SimpleCode}
									/>
								</Grid>
								<Grid item xs={12} sm={12} md={3}>
									<TypoCheckboxExContainer
										label="結清保留"
										name="Keep"
										value={data?.Keep}
									/>
								</Grid> */}
								<Grid item xs={12} sm={12} md={12}>
									<TypoTextFieldContainer
										required
										label="品名規格"
										name="ProdData"
										fullWidth>
										{data?.ProdData}
									</TypoTextFieldContainer>
								</Grid>
							</Grid>
						</FormSectionBox>

						<FormSectionBox
							// bgcolor="rgba(0, 0, 0, 0.02)"
							// borderLeft="5px solid rgb(16 160 215)"
							p={1}
							pt={0}
							mb={2}>
							<FormSectionTitle>分類</FormSectionTitle>
							<Grid container columns={12} spacing={1}>
								<Grid item xs={12} sm={12} md={3}>
									<ProdCatLPickerContainer name="catL">
										{ProdLCats.getOptionLabel(data?.catL)}
									</ProdCatLPickerContainer>
								</Grid>
								<Grid item xs={12} sm={12} md={3}>
									<ProdCatMPickerContainer name="catM">
										{ProdMCats.getOptionLabel(data?.catM)}
									</ProdCatMPickerContainer>
								</Grid>
								<Grid item xs={12} sm={12} md={3}>
									<ProdCatSPickerContainer name="catS">
										{ProdSCats.getOptionLabel(data?.catS)}
									</ProdCatSPickerContainer>
								</Grid>
								{/* <Grid item xs={12} sm={12} md={2}>
									<TypoCheckboxExContainer
										label="可退貨"
										name="Rejectable"
									/>
								</Grid> */}
								<FlexBox fullWidth />
								<Grid item xs={12} sm={12} md={3}>
									<ProdTypeAPickerContainer name="typeA">
										{ProdTypeA.getOptionLabel(data?.typeA)}
									</ProdTypeAPickerContainer>
								</Grid>

								<Grid item xs={12} sm={12} md={3}>
									<ProdTypeBPickerContainer name="typeB">
										{ProdTypeB.getOptionLabel(data?.typeB)}
									</ProdTypeBPickerContainer>
								</Grid>
								<Grid item xs={12} sm={12} md={3}>
									<TaxTypePickerContainer
										name="taxType"
										label="稅別">
										{TaxTypes.getOptionLabel(data?.taxType)}
									</TaxTypePickerContainer>
								</Grid>
								<Grid item xs={12} sm={12} md={3}>
									<CounterPickerContainer name="counter">
										{Counters.getOptionLabel(data?.counter)}
									</CounterPickerContainer>
								</Grid>
							</Grid>
						</FormSectionBox>
						<FormSectionBox p={1} pt={0} mb={2}>
							<FormSectionTitle>成本</FormSectionTitle>
							<Grid container columns={12} spacing={1}>
								<Grid item xs={12} sm={12} md={3}>
									<TypoTextFieldContainer
										name="StdCost"
										label="標準成本"
										type="number">
										{Strings.formatPrice(data?.StdCost)}
									</TypoTextFieldContainer>
								</Grid>
								<Grid item xs={12} sm={12} md={3}>
									<TypoTextFieldContainer
										name="TranCost"
										label="調撥成本"
										type="number">
										{Strings.formatPrice(data?.TranCost)}
									</TypoTextFieldContainer>
								</Grid>
								<Grid item xs={12} sm={12} md={3}>
									<TypoTextFieldContainer
										name="LocalCost"
										label="批發成本(本)"
										type="number">
										{Strings.formatPrice(data?.LocalCost)}
									</TypoTextFieldContainer>
								</Grid>
								<Grid item xs={12} sm={12} md={3}>
									<TypoTextFieldContainer
										name="OutCost"
										label="批發成本(外)"
										type="number">
										{Strings.formatPrice(data?.OutCost)}
									</TypoTextFieldContainer>
								</Grid>
							</Grid>
						</FormSectionBox>
						<FormSectionBox
							// bgcolor="rgba(0, 0, 0, 0.02)"
							// borderLeft="5px solid rgb(16 160 215)"
							pt={2}
							p={1}
							mb={2}>
							<Grid container columns={12} spacing={1}>
								<Grid item xs={12} sm={12} md={3}>
									<TypoTextFieldContainer
										label="儲位"
										name="Location"
										fullWidth>
										{data?.Location}
									</TypoTextFieldContainer>
								</Grid>

								<Grid item xs={12} sm={12} md={4}>
									<CmsTypePickerContainer name="cmsType">
										{CmsTypes.getOptionLabel(data?.cmsType)}
									</CmsTypePickerContainer>
								</Grid>
							</Grid>
						</FormSectionBox>

						<FormSectionBox
							// bgcolor="rgba(0, 0, 0, 0.02)"
							// borderLeft="5px solid rgb(16 160 215)"
							p={1}
							pt={0}
							mb={2}>
							<FormSectionTitle>安全存量</FormSectionTitle>
							<Grid container columns={12} spacing={1}>
								<Grid item xs={12} sm={12} md={3}>
									<TypoTextFieldContainer
										label="平日"
										name="SafeQty"
										fullWidth
										type="number">
										{Strings.formatPrice(data?.SafeQty)}
									</TypoTextFieldContainer>
								</Grid>
								{/* <Grid item xs={12} sm={12} md={3}>
									<TypoTextFieldContainer
										label="假日"
										name="Stock2"
										fullWidth
										type="number"
									/>
								</Grid>
								<Grid item xs={12} sm={12} md={3}>
									<TypoTextFieldContainer
										label="續假日"
										name="Stock2"
										fullWidth
										type="number"
									/>
								</Grid> */}
							</Grid>
						</FormSectionBox>

						<FormSectionBox
							// bgcolor="rgba(0, 0, 0, 0.02)"
							// borderLeft="5px solid rgb(16 160 215)"
							p={1}
							pt={0}
							mb={2}>
							<FormSectionTitle>包裝單位</FormSectionTitle>
							<Grid container columns={12} spacing={1}>
								<Grid item xs={12} sm={12} md={3}>
									<PkyTypePickerContainer
										name="bunit"
										label="庫存">
										{PkgTypes.getOptionLabel(data?.bunit)}
									</PkyTypePickerContainer>
								</Grid>
								<Grid item xs={12} sm={12} md={3}>
									<PkyTypePickerContainer
										name="sunit"
										label="銷售">
										{PkgTypes.getOptionLabel(data?.sunit)}
									</PkyTypePickerContainer>
								</Grid>
								<Grid item xs={12} sm={12} md={3}>
									<PkyTypePickerContainer
										name="iunit"
										label="進貨">
										{PkgTypes.getOptionLabel(data?.iunit)}
									</PkyTypePickerContainer>
								</Grid>
								<Grid item xs={12} sm={12} md={3}>
									<PkyTypePickerContainer
										name="munit"
										label="BOM">
										{PkgTypes.getOptionLabel(data?.munit)}
									</PkyTypePickerContainer>
								</Grid>
							</Grid>
						</FormSectionBox>

						<FormSectionBox
							// bgcolor="rgba(0, 0, 0, 0.02)"
							// borderLeft="5px solid rgb(16 160 215)"
							p={1}
							pt={0}
							mb={2}>
							<FormSectionTitle>換算率</FormSectionTitle>
							<Grid container columns={12} spacing={1}>
								<Grid item xs={12} sm={12} md={3}>
									<TypoTextFieldContainer
										label="銷/存"
										type="number"
										name="SRate"
										value={Strings.formatRate(data?.SRate)}
									/>
								</Grid>
								<Grid item xs={12} sm={12} md={3}>
									<TypoTextFieldContainer
										label="進/存"
										type="number"
										name="IRate"
										value={Strings.formatRate(data?.IRate)}
									/>
								</Grid>
								<Grid item xs={12} sm={12} md={3}>
									<TypoTextFieldContainer
										label="BOM/存"
										type="number"
										name="MRate"
										value={Strings.formatRate(data?.MRate)}
									/>
								</Grid>
							</Grid>
						</FormSectionBox>

						<FormSectionBox
							// bgcolor="rgba(0, 0, 0, 0.02)"
							// borderLeft="5px solid rgb(16 160 215)"
							p={1}
							pt={0}
							mb={2}>
							<FormSectionTitle>售價</FormSectionTitle>
							<Grid container columns={12} spacing={1}>
								<Grid item xs={12} sm={12} md={2}>
									<TypoTextFieldContainer
										label="建議售價"
										name="Price"
										type="number"
										value={Strings.formatPrice(data?.Price)}
									/>
								</Grid>
								<Grid item xs={12} sm={12} md={2}>
									<TypoTextFieldContainer
										label="售價A"
										type="number"
										name="PriceA"
										value={Strings.formatPrice(
											data?.PriceA
										)}
									/>
								</Grid>

								<Grid item xs={12} sm={12} md={2}>
									<TypoTextFieldContainer
										label="售價B"
										type="number"
										name="PriceB"
										value={Strings.formatPrice(
											data?.PriceB
										)}
									/>
								</Grid>
								<Grid item xs={12} sm={12} md={2}>
									<TypoTextFieldContainer
										label="售價C"
										type="number"
										name="PriceC"
										value={Strings.formatPrice(
											data?.PriceC
										)}
									/>
								</Grid>
								<Grid item xs={12} sm={12} md={2}>
									<TypoTextFieldContainer
										label="售價D"
										type="number"
										name="PriceD"
										value={Strings.formatPrice(
											data?.PriceD
										)}
									/>
								</Grid>
								<Grid item xs={12} sm={12} md={2}>
									<TypoTextFieldContainer
										label="售價E"
										type="number"
										name="PriceE"
										value={Strings.formatPrice(
											data?.PriceE
										)}
									/>
								</Grid>
							</Grid>
						</FormSectionBox>
						<Grid container>
							<Grid item xs={12} sm={12} md={6}>
								<FormSectionBox pt={2} p={1} mb={2}>
									<FormSectionTitle>
										調撥成本
									</FormSectionTitle>
								</FormSectionBox>
							</Grid>
							<Grid item xs={12} sm={12} md={6}>
								<FormSectionBox pt={2} p={1} mb={2}>
									<FormSectionTitle>
										組合細項
									</FormSectionTitle>
								</FormSectionBox>
							</Grid>
						</Grid>

						{/* <FormSectionBox
						bgcolor="rgba(0, 0, 0, 0.02)"
						borderLeft="5px solid rgb(16 160 215)"
						pt={2}
						p={1}
						mb={2}>
						<TypoA01TransferEditorContainer
							name="transferItems"
							value={data?.Transfer}
						/>
					</FormSectionBox> */}
						{/* 組合 */}
					</Box>
				)}
			</DialogEx>
		);
	})
);

A01Dialog.propTypes = {
	data: PropTypes.object,
	// readState: PropTypes.symbol,
	readWorking: PropTypes.bool,
	dataLoaded: PropTypes.bool,
};

A01Dialog.displayName = "A01Dialog";
export default A01Dialog;
