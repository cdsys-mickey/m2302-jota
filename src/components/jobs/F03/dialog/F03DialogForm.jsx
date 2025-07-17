import FlexBox from "@/shared-components/FlexBox";
import LoadingTypography from "@/shared-components/LoadingTypography";
import { DatePickerWrapper } from "@/shared-components/date-picker/DatePickerWrapper";
import FormBox from "@/shared-components/form/FormBox";
import FormErrorBox from "@/shared-components/form/FormErrorBox";
import { TextFieldWrapper } from "@/shared-components/TextFieldEx/TextFieldWrapper";
import { Box, Container, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import { F03ProdGridContainer } from "./prod-grid/F03ProdGridContainer";

const F03DialogForm = memo((props) => {
	const {
		onSubmit,
		readError,
		data,
		readWorking,
		itemDataReady,
		creating,
		editing,
		updating,
		handleRstDateChanged,
		slotProps,
		...rest
	} = props;
	return (
		<form onSubmit={onSubmit}>
			{readWorking && (
				<Container maxWidth="xs">
					<FlexBox justifyContent="center" minHeight="30em">
						<LoadingTypography iconSize="lg" variant="h5">
							讀取中...
						</LoadingTypography>
					</FlexBox>
				</Container>
			)}
			{readError && <FormErrorBox error={readError} {...slotProps?.error} />}
			{itemDataReady && (
				<FormBox pt={editing ? 1 : 0}>
					<Grid container columns={24} spacing={editing ? 1 : 1}>
						<Grid item xs={24} sm={5} md={5}>
							<TextFieldWrapper
								typo
								name="PhyID"
								label="清單編號"
								autoFocus
								fullWidth
								editing={false}
							/>
						</Grid>
						<Grid item xs={12} sm={8} md={8}>
							<TextFieldWrapper
								typo
								name="PhyData_N"
								label="清單名稱"
								fullWidth
								required
								rules={{
									required: "試算單名稱為必填",
								}}
								editing={false}
							/>
						</Grid>
						<Grid item xs={24} sm={6} md={6}>
							<DatePickerWrapper
								label="電腦帳產生日期"
								typo
								name="ActDate_N"
								editing={false}
							/>
						</Grid>
					</Grid>
					<Box py={1}>
						<F03ProdGridContainer />
					</Box>
				</FormBox>
			)}
		</form>
	);
});

F03DialogForm.propTypes = {
	readWorking: PropTypes.bool,
	readError: PropTypes.object,
	data: PropTypes.object,
	itemDataReady: PropTypes.bool,
	purchaseOrdersDisabled: PropTypes.bool,
	handleRstDateChanged: PropTypes.func,
	slotProps: PropTypes.object,
};

F03DialogForm.displayName = "F03DialogForm";
export default F03DialogForm;

