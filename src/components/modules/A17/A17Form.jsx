import { memo } from "react";
import PropTypes from "prop-types";
import { Box, Container, Grid } from "@mui/material";
import FlexBox from "../../../shared-components/FlexBox";
import LoadingTypography from "../../../shared-components/LoadingTypography";
import FormSectionBox from "../../../shared-components/form/FormSectionBox";
import TypoTextFieldContainer from "../../../shared-components/typo/TypoTextFieldContainer";
import ErrorBox from "../../../shared-components/ErrorBox";
import FormFieldLabel from "../../../shared-components/form/FormFieldLabel";
import Depts from "../../../modules/md-depts";
import TypoDeptPickerContainer from "../../fields/TypoDeptPickerContainer";
import ContainerEx from "../../../shared-components/ContainerEx";

const A17Form = memo((props) => {
	const {
		readWorking,
		itemDataReady,
		editing,
		updating,
		readFailed,
		readError,
		...rest
	} = props;
	return (
		<ContainerEx maxWidth="xs" alignLeft>
			<form {...rest}>
				{readFailed && <ErrorBox error={readError} />}
				{readWorking && (
					<FlexBox justifyContent="center" minHeight="30em">
						<LoadingTypography iconSize="lg" variant="h5">
							讀取中...
						</LoadingTypography>
					</FlexBox>
				)}
				{itemDataReady && (
					<Box
						pt={1}
						sx={() => ({
							"& .MuiInputLabel-root": {
								fontSize: "105%",
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
						<FormSectionBox py={editing ? 2 : 1}>
							<Grid
								container
								columns={12}
								spacing={editing ? 2 : 1}>
								<Grid item xs={12}>
									<TypoDeptPickerContainer
										name="dept"
										readOnly={true}
									/>
								</Grid>
								<Grid item xs={12}>
									<TypoTextFieldContainer
										name="StockPword"
										label="強迫出貨密碼"
										autoFocus
										fullWidth
										// readOnly={updating}
									/>
								</Grid>
							</Grid>
						</FormSectionBox>
					</Box>
				)}
			</form>
		</ContainerEx>
	);
});

A17Form.propTypes = {
	readWorking: PropTypes.bool,
	itemDataReady: PropTypes.bool,
	editing: PropTypes.bool,
	updating: PropTypes.bool,
	readFailed: PropTypes.bool,
	readError: PropTypes.object,
};

A17Form.displayName = "A17Form";
export default A17Form;
