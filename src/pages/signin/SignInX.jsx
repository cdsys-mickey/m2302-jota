import ControlledAccountField from "@/components/auth/ControlledAccountField";
import ControlledPwordField from "@/components/auth/ControlledPwordField";
import { RememberMeCheckboxContainer } from "@/components/auth/RememberMeCheckboxConainer";
import FlexBox from "@/shared-components/FlexBox";
import { ControlledLocalCaptchaField } from "@/shared-components/local-captcha/controlled-local-captcha-field";
import LoginIcon from "@mui/icons-material/Login";
import { LoadingButton } from "@mui/lab";
import { Box, Divider, Grid, Paper } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import { ControlledTextField } from "../../shared-components/controlled/ControlledTextField";
import { ControlledCaptchaField } from "../../shared-components/captcha-field/ControlledCaptchaField";
import { CaptchaFieldContainer } from "../../components/auth/CaptchaFieldContainer";

const SignInX = memo((props) => {
	const { loading, ...rest } = props;
	return (
		<Paper
			elevation={4}
			sx={{
				backgroundColor: "rgba(255,255,255,0.8)",
			}}>
			<Box pt={3} pb={1} px={2}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<ControlledTextField
							name="ac"
							autoFocus
							label="帳號"
							fullWidth
							required
							size="small"
							sx={{
								"& .MuiInputBase-root": {
									backgroundColor: "#fff",
								},
							}}
						/>
					</Grid>
					<Grid item xs={12}>
						<ControlledTextField
							type="password"
							inputProps={{
								autocomplete: "current-password",
							}}
							fullWidth
							name="pw"
							label="通行碼"
							rules={{ required: "請輸入通行碼" }}
							required
							size="small"
							sx={{
								"& .MuiInputBase-root": {
									backgroundColor: "#fff",
								},
							}}
						/>
					</Grid>
				</Grid>
			</Box>
			<Box px={2}>
				<Grid container spacing={0}>
					<Grid item xs={12}>
						<RememberMeCheckboxContainer name="rememberMe" />
					</Grid>
				</Grid>
			</Box>
			<Divider />
			<Box p={2}>
				<FlexBox inline fullWidth justifyContent="center" mt={0} mb={2}>
					<CaptchaFieldContainer
						name="captcha"
						length={4}
						placeholder="請輸入驗證碼"
					/>
				</FlexBox>
				<Divider />
				<FlexBox mt={1} inline fullWidth>
					<FlexBox flex={1} alignItems="center">
						{/* <Link
									variant="body2"
									underline="hover"
									sx={{
										cursor: "pointer",
									}}>
									重設密碼
								</Link> */}
					</FlexBox>

					<FlexBox>
						<LoadingButton
							type="submit"
							variant="contained"
							size="small"
							loading={loading}
							endIcon={<LoginIcon />}>
							登入
						</LoadingButton>
					</FlexBox>
				</FlexBox>
			</Box>
		</Paper>
	);
});

SignInX.displayName = "SignInX";
SignInX.propTypes = {
	loading: PropTypes.bool,
};
export default SignInX;
