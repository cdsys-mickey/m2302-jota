import { Box, Grid } from "@mui/material";
import { memo } from "react";

import FlexBox from "@/shared-components/FlexBox";
import LoadingTypography from "@/shared-components/LoadingTypography";
import FormSectionBox from "@/shared-components/form/FormSectionBox";
import FormSectionTitle from "@/shared-components/form/FormSectionTitle";
import TypoTextFieldContainer from "@/shared-components/typo/TypoTextFieldContainer";
import { Container } from "@mui/material";
import PropTypes from "prop-types";
import { ProdMaterialsGridContainer } from "./prods/ProdMaterialsGridContainer";
import TypoProdPickerContainer from "./fields/TypoProdPickerContainer";
import { PackageTypeLabelContainer } from "./fields/PackageTypeLabelContainer";
import { useMemo } from "react";

const A20Form = memo((props) => {
	const { data, readWorking, dataLoaded, editing, updating, ...rest } = props;

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
			{dataLoaded && (
				<Box
					pt={1}
					sx={() => ({
						"& .MuiInputLabel-root": {
							fontSize: "120%",
							// fontWeight: 500,
							// color: "rgba(0, 0, 0, 0.8 )",
						},
						"& .MuiInputLabel-shrink": {
							fontSize: "120%",
							fontWeight: 600,
							left: "-2px",
							// color: theme.palette.primary.main,
						},
					})}>
					<FormSectionTitle>關連貨品基本資料</FormSectionTitle>
					<FormSectionBox pt={editing ? 2 : 1}>
						<Grid container columns={12} spacing={editing ? 2 : 1}>
							<Grid item xs={12} sm={12} md={6}>
								<TypoProdPickerContainer
									name="prod"
									label="貨品"
									autoFocus
									fullWidth
									required
									withBomPackageName
									rules={{ required: "對應貨品為必填" }}
									readOnly={updating}
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={2}>
								<TypoTextFieldContainer
									name="ProdQty"
									label="製造量"
									type="number"
									fullWidth
									required
									rules={{ required: "製造量為必填" }}
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={2}>
								<PackageTypeLabelContainer
									name="prod.PackData_N"
									label="包裝說明">
									{data?.PackData_N}
								</PackageTypeLabelContainer>
							</Grid>
							<FlexBox fullWidth />
						</Grid>
					</FormSectionBox>
					<FormSectionBox p={1} pt={0} mb={2}>
						<FormSectionTitle>原物料</FormSectionTitle>
						<ProdMaterialsGridContainer />
					</FormSectionBox>
				</Box>
			)}
		</form>
	);
});

A20Form.propTypes = {
	data: PropTypes.object,
	readWorking: PropTypes.bool,
	dataLoaded: PropTypes.bool,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	store: PropTypes.bool,
};

A20Form.displayName = "A20Form";
export default A20Form;
