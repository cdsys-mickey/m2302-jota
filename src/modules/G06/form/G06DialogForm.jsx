import { Grid } from "@mui/material";
import { memo } from "react";

import FlexBox from "@/shared-components/FlexBox";
import LoadingTypography from "@/shared-components/LoadingTypography";

import CustomerPicker from "@/components/picker/CustomerPicker";
import FormBox from "@/shared-components/form/FormBox";
import FormErrorBox from "@/shared-components/form/FormErrorBox";

import FormSectionBox from "@/shared-components/form/FormSectionBox";
import FormSectionTitle from "@/shared-components/form/FormSectionTitle";
import { Container } from "@mui/material";
import PropTypes from "prop-types";
import { G06CashGridContainer } from "./cash/G06CashGridContainer";
import { G06ChkGridContainer } from "./chk/G06ChkGridContainer";
import { G06DocGridContainer } from "./doc/G06DocGridContainer";
import { FormFieldLabel } from "@/shared-components";

const NumberFieldLabel = (props) => {
	const { ...rest } = props;
	return <FormFieldLabel
		slotProps={{
			value: {
				ml: 2
			},
			negativeValue: {
				ml: 1
			}
		}}
		{...rest}
	/>
}

const G06DialogForm = memo((props) => {
	const {
		data,
		readWorking,
		readError,
		itemDataReady,
		editing,
		updating,
		slotProps,
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
					{/* <FormSectionTitle>基本資料</FormSectionTitle> */}
					<FormSectionBox >
						<Grid container columns={12} spacing={1}>
							<Grid item xs={12} sm={12} md={2}>
								<FormFieldLabel
									name="AccYM"
									label="帳款年月"
								/>
							</Grid>
							<Grid item xs={12} sm={12} md={1}>
								<FormFieldLabel
									name="Stage"
									label="期別"
								/>
							</Grid>

							<Grid item xs={12} sm={12} md={6}>
								<CustomerPicker
									typo
									name="CustID"
									// label="客戶代號"
									// forId
									{...rest}
									disableOpenOnInput
									editing={false}
								// onChanged={onCustomerChange}
								// slotProps={{
								// 	paper: {
								// 		sx: {
								// 			width: 260,
								// 		},
								// 	},
								// }}
								/>
							</Grid>
							<FlexBox fullWidth />

						</Grid>
					</FormSectionBox>
					<FormSectionBox>
						<Grid container>
							<Grid item xs={2}>
								<FormFieldLabel
									name="PreAmt"
									label="前期餘額"
								/>
							</Grid>
							<Grid item xs={2}>
								<NumberFieldLabel
									name="RcvAmt"
									label="＋本期應收"
								/>
							</Grid>
							<Grid item xs={2}>
								<NumberFieldLabel
									name="CollAmt"
									label="－本期收款"
								/>
							</Grid>
							<Grid item xs={2}>
								<NumberFieldLabel
									name="RemAmt"
									label="＝本期餘額"
								/>
							</Grid>
							<Grid item xs={2}>
								<FlexBox justifyContent="flex-end">
									<FormFieldLabel
										name="DiffAmt"
										label="[收沖差額]"
									/>
								</FlexBox>
							</Grid>
							<Grid item xs={2}>
								<FlexBox justifyContent="flex-end">
									<FormFieldLabel
										name="CutDate"
										label="[資料截止日期]"
									/>
								</FlexBox>
							</Grid>
						</Grid>
					</FormSectionBox>


					{/* 收款 */}
					<FormSectionTitle>現金收款</FormSectionTitle>
					<FormSectionBox editing={editing}>
						<Grid container spacing={1}>
							<Grid item xs={12} sm={12} md={6}>
								<G06CashGridContainer />
							</Grid>
							<Grid item xs={12} sm={12} md={2}>
								<FlexBox justifyContent="center" pt={0}>
									<FormFieldLabel
										name="CashAmt"
										label="本期收現"
									/>
								</FlexBox>
							</Grid>
							<Grid item xs={12} sm={12} md={2}>
								<FlexBox justifyContent="center" pt={0}>
									<FormFieldLabel
										name="DnsAmt"
										label="本期折讓"
									/>
								</FlexBox>
							</Grid>
							<Grid item xs={12} sm={12} md={2}>
								<FlexBox justifyContent="center" pt={0}>
									<FormFieldLabel
										name="ChkAmt"
										label="本期收票"
									/>
								</FlexBox>
							</Grid>
						</Grid>
					</FormSectionBox>
					{/* 票據 */}
					<FormSectionTitle>票據收款</FormSectionTitle>
					<FormSectionBox editing={editing}>
						<G06ChkGridContainer />
					</FormSectionBox>
					{/*  銷售銷退 */}
					<FormSectionTitle>銷售/銷退單據</FormSectionTitle>
					<FormSectionBox editing={editing}>
						<G06DocGridContainer />
						<FlexBox justifyContent="flex-end">
							<FormFieldLabel
								name="CutAmt"
								label="單據沖銷"
								inline
							/>
						</FlexBox>
					</FormSectionBox>
				</FormBox>
			)}
		</form>
	);
});

G06DialogForm.propTypes = {
	data: PropTypes.object,
	readWorking: PropTypes.bool,
	itemDataReady: PropTypes.bool,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	store: PropTypes.bool,
	readError: PropTypes.object,
	slotProps: PropTypes.object,
};

G06DialogForm.displayName = "G06Form";
export default G06DialogForm;

