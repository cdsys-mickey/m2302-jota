import { memo } from "react";
import PropTypes from "prop-types";
import FlexContainer from "@/shared-components/FlexContainer";
import FlexBox from "@/shared-components/FlexBox";
import ModuleHeading from "@/shared-components/ModuleHeading";
import LockResetIcon from "@mui/icons-material/LockReset";
import Colors from "@/modules/md-colors";
import { Box, FormHelperText, Grid, Paper } from "@mui/material";
import { ControlledTextField } from "@/shared-components/controlled/ControlledTextField";
import ResponsiveLoadingButton from "@/shared-components/responsive/ResponsiveLoadingButton";
import LoginIcon from "@mui/icons-material/Login";
import BackgroundImage from "@/images/rm218batch4-ning-34_2.jpg";

const RenewFrame = memo((props) => {
	const { loading, toLogin, ...rest } = props;
	return (
		<FlexContainer
			maxWidth="xs"
			justifyContent="center"
			alignItems="center"
			sx={{
				// backgroundImage: `url(${BackgroundImage})`,
				// backgroundSize: "cover",
				// backgroundRepeat: "no-repeat",
				minHeight: "80vh",
			}}>
			<FlexBox
				px={3}
				// mb="10vh"
				sx={{
					maxWidth: "25rem",
				}}>
				<FlexBox sx={{ flexDirection: "column" }}>
					<FlexBox mb={1} justifyContent="flex-start">
						<ModuleHeading
							size="md"
							icon={LockResetIcon}
							text="密碼變更"
							iconColor={Colors.PRIMARY}
						/>
					</FlexBox>
					<Box component={Paper} elevation={4} px={3} pt={3} pb={2}>
						<Grid container spacing={2}>
							{/* <Grid item xs={12}>
								<ControlledTextField
									fullWidth
									label="舊密碼"
									autoFocus
									placeholder="請輸入舊密碼"
									name="ogPword"
									required
									size="small"
									rules={{
										required: "密碼為必填",
									}}
									sx={{
										"& .MuiInputBase-root": {
											backgroundColor: "#fff",
										},
									}}
								/>
							</Grid> */}
							<Grid item xs={12}>
								<ControlledTextField
									fullWidth
									label="新密碼"
									type="password"
									autoFocus
									placeholder="請輸入新密碼"
									name="newPword"
									required
									size="small"
									rules={{
										required: "新密碼為必填",
									}}
									sx={{
										"& .MuiInputBase-root": {
											backgroundColor: "#fff",
										},
									}}
								/>
							</Grid>
							<Grid item xs={12}>
								<ControlledTextField
									fullWidth
									label="新密碼複驗"
									type="password"
									placeholder="請再次輸入新密碼"
									name="newPword2"
									required
									size="small"
									rules={{
										required: "密碼複驗為必填",
									}}
									sx={{
										"& .MuiInputBase-root": {
											backgroundColor: "#fff",
										},
									}}
								/>
							</Grid>
						</Grid>

						<FlexBox
							fullWidth
							justifyContent="flex-end"
							mt={2}
							mb={1}
							sx={{
								"& button": {
									marginLeft: 1,
								},
							}}>
							<ResponsiveLoadingButton onClick={toLogin}>
								回登入頁面
							</ResponsiveLoadingButton>
							<ResponsiveLoadingButton
								type="submit"
								variant="contained"
								size="small"
								loading={loading}
								endIcon={<LoginIcon />}>
								送出
							</ResponsiveLoadingButton>
						</FlexBox>
						<FormHelperText error>
							*基於安全性考量，請變更您的密碼後再進入系統
						</FormHelperText>
					</Box>
				</FlexBox>
			</FlexBox>
		</FlexContainer>
	);
});

RenewFrame.propTypes = {
	loading: PropTypes.bool,
	toLogin: PropTypes.func,
};

RenewFrame.displayName = "RenewFrame";
export default RenewFrame;
