import { memo } from "react";
import PropTypes from "prop-types";
import { Box, Container, FormHelperText, Grid } from "@mui/material";
import { ControlledTextField } from "@/shared-components/controlled/ControlledTextField";
import ResponsiveLoadingButton from "@/shared-components/button/ResponsiveLoadingButton";
import LoginIcon from "@mui/icons-material/Login";
import FlexBox from "@/shared-components/FlexBox";

const ChangePwordForm = memo((props) => {
	const { loading = false, verified, ...rest } = props;
	return (
		<Container maxWidth="xs">
			<Box pt={3}>
				<form {...rest} noValidate>
					{verified ? (
						<>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<ControlledTextField
										name="newPword"
										fullWidth
										label="新密碼"
										type="password"
										autoFocus
										placeholder="請輸入新密碼"
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
										name="newPword2"
										fullWidth
										label="新密碼複驗"
										type="password"
										placeholder="請再次輸入新密碼"
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
							<FormHelperText>
								*基於安全性考量，密碼請包括英數
							</FormHelperText>
						</>
					) : (
						<>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<ControlledTextField
										name="ogPword"
										type="password"
										fullWidth
										label="舊密碼"
										autoFocus
										placeholder="請輸入舊密碼"
										required
										size="small"
										rules={{
											required:
												"必須先輸入原密碼才能繼續",
										}}
										sx={{
											"& .MuiInputBase-root": {
												backgroundColor: "#fff",
											},
										}}
									/>
								</Grid>
							</Grid>
							<FormHelperText>
								*基於安全性考量，請先輸入您的密碼
							</FormHelperText>
						</>
					)}
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
						<ResponsiveLoadingButton
							type="submit"
							variant="contained"
							size="small"
							loading={loading}
							endIcon={<LoginIcon />}>
							送出
						</ResponsiveLoadingButton>
					</FlexBox>
				</form>
			</Box>
		</Container>
	);
});

ChangePwordForm.propTypes = {
	loading: PropTypes.bool,
	verified: PropTypes.bool,
};

ChangePwordForm.displayName = "ChangePwordForm";
export default ChangePwordForm;
