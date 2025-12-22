import { FlexBox } from "@/shared-components";
import FormBox from "@/shared-components/form/FormBox";
import FormErrorBox from "@/shared-components/form/FormErrorBox";
import LoadingTypography from "@/shared-components/LoadingTypography";
import { TextFieldWrapper } from "@/shared-components/TextFieldEx/TextFieldWrapper";
import { Container, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import { P14QuoteGridContainer } from "./quotes/P14QuoteGridContainer";

const P14DialogForm = memo((props) => {
	const {
		readError,
		data,
		readWorking,
		itemDataReady,
		creating,
		editing,
		updating,
		slotProps,
		...rest
	} = props;
	return (
		<>
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
				<>
					<FormBox pt={1}>
						<Grid container columns={24} spacing={1}>
							<Grid item md={5}>
								<TextFieldWrapper
									typo
									name="ItmID"
									label="品項列印序號"
									autoFocus={creating}
									fullWidth
									disabled={updating}
									required
									rules={{
										required: "清單編號為必填"
									}}
									slotProps={{
										htmlInput: {
											maxLength: 2
										}
									}}
								/>
							</Grid>

							<Grid item md={9}>
								<TextFieldWrapper
									typo
									name="ItmData"
									label="品項列印名稱"
									autoFocus={updating}
									fullWidth
									required
									rules={{
										required: "名稱為必填",
									}}
								/>
							</Grid>
							<Grid item xs={24}>
								<P14QuoteGridContainer />
							</Grid>
							{/* <Grid item xs={24}>
								<TextFieldWrapper
									typo
									name="Message_N"
									multiline
									minRows={1}
									maxRows={1}
									label="訊息"
									fullWidth
									editing={false}
								/>
							</Grid> */}
						</Grid>
					</FormBox>

				</>
			)}
		</>
	);
});

P14DialogForm.propTypes = {
	readWorking: PropTypes.bool,
	readError: PropTypes.object,
	data: PropTypes.object,
	itemDataReady: PropTypes.bool,
	slotProps: PropTypes.object,
};

P14DialogForm.displayName = "P14DialogForm";
export default P14DialogForm;


