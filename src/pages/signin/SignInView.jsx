import { FlexBox } from "shared-components";

// import { RememberMeCheckboxContainer } from "@/components/auth/RememberMeCheckboxConainer";
import { CaptchaFieldContainer } from "@/components/auth/CaptchaFieldContainer";
import { ButtonEx, CheckboxExField } from "@/shared-components";
import ControlledTextField from "@/shared-components/TextFieldEx/ControlledTextField";
import LoginIcon from "@mui/icons-material/Login";
import { Box, Collapse, Divider, Grid, Paper } from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef, memo, useMemo } from "react";
import TooltipWrapper from "@/shared-components/TooltipWrapper/TooltipWrapper";

const SignInView = memo(
	forwardRef((props, ref) => {
		const { loading, hideCaptcha, newVersion, ...rest } = props;

		const pwLabel = useMemo(() => {
			return hideCaptcha ? "OTP" : "密碼";
		}, [hideCaptcha])

		const isRefreshRequired = useMemo(() => {
			return !!newVersion;
		}, [newVersion])

		const _tooltip = useMemo(() => {
			return newVersion ? `請使用 Ctrl+F5 更新後再登入` : false;
		}, [newVersion])

		return (
			<Paper
				ref={ref}
				elevation={4}
				sx={{
					backgroundColor: "rgba(255,255,255,0.8)",
				}}
				{...rest}>
				<Box pt={3} pb={1} px={2}>
					<Grid container spacing={1}>
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
								// passwordPressed
								type="password"
								fullWidth
								name="pw"
								label={pwLabel}
								required
								rules={{ required: `請輸入${pwLabel}` }}
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
							<CheckboxExField
								name="rememberMe"
								label="記住我"
								focusNextFieldBySpace={false}
							/>
						</Grid>
					</Grid>
				</Box>
				<Divider />
				<Box p={2}>
					<Collapse in={!hideCaptcha}>
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
					</Collapse>

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
						<TooltipWrapper title={_tooltip}>
							<FlexBox>
								<ButtonEx
									type="submit"
									variant="contained"
									{...(hideCaptcha && {
										color: "warning"
									})}
									size="small"
									loading={loading}
									endIcon={<LoginIcon />}
									disabled={isRefreshRequired}
								// #for dev use, dont delete
								// disabled={true}
								>
									登入
								</ButtonEx>
							</FlexBox>
						</TooltipWrapper>
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
SignInView.propTypes = {
	loading: PropTypes.bool,
	isRefreshRequired: PropTypes.bool,
	hideCaptcha: PropTypes.bool,
	newVersion: PropTypes.string
}
export default SignInView;
