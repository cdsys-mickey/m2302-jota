import FlexBox from "@/shared-components/FlexBox";

import { RememberMeCheckboxContainer } from "@/components/auth/RememberMeCheckboxConainer";
import LoginIcon from "@mui/icons-material/Login";
import { LoadingButton } from "@mui/lab";
import { Box, Divider, Grid, Paper } from "@mui/material";
import { forwardRef, memo } from "react";
import { CaptchaFieldContainer } from "@/components/auth/CaptchaFieldContainer";
import { ControlledTextField } from "@/shared-components/TextFieldEx/ControlledTextField";

const SignIn = memo(
	forwardRef((props, ref) => {
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
								fullWidth
								name="pw"
								label="密碼"
								required
								rules={{ required: "請輸入密碼" }}
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
					<FlexBox
						inline
						fullWidth
						justifyContent="center"
						mt={0}
						mb={2}>
						<CaptchaFieldContainer
							name="captcha"
							length={4}
							placeholder="請輸入驗證碼"
						/>
					</FlexBox>
					<Divider />
					<FlexBox mt={1} inline fullWidth alignItems="center">
						<FlexBox flex={1}>
							{/* <Link
								variant="body2"
								underline="hover"
								sx={{
									cursor: "pointer",
								}}
							>
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
					{/* <FlexBox mt={1}>
							<Typography
								variant="body2"
								color="text.secondary">
								如發生帳號鎖定或不知密碼請點選「重設密碼」
							</Typography>
						</FlexBox>
						<FlexBox>
							<Typography
								variant="body2"
								color="text.secondary">
								其他問題請聯繫客服(02)27089789分機126或127
							</Typography>
						</FlexBox> */}
				</Box>
			</Paper>
		);
	})
);

export default SignIn;
