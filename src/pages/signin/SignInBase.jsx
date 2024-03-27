import BackgroundImage from "@/images/rm218batch4-ning-34_2.jpg";
import FlexBox from "@/shared-components/FlexBox";
import { PublicPageContainer } from "@/shared-pages/PublicPageContainer";
import { forwardRef, memo } from "react";

import Colors from "@/modules/md-colors";
import ModuleHeading from "@/shared-components/ModuleHeading";
import LockIcon from "@mui/icons-material/Lock";
import { Container } from "@mui/material";
import PropTypes from "prop-types";
import FlexContainer from "@/shared-components/FlexContainer";

const SignInBase = memo(
	forwardRef((props, ref) => {
		const { children } = props;
		return (
			<PublicPageContainer
				ref={ref}
				sx={{
					backgroundImage: `url(${BackgroundImage})`,
					backgroundSize: "cover",
					backgroundRepeat: "no-repeat",
					minHeight: "100vh",
				}}
				boxStyles={{ alignItems: "center" }}>
				<FlexContainer
					maxWidth="xs"
					justifyContent="center"
					alignItems="center"
					ref={ref}>
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
									icon={LockIcon}
									text="身分驗證"
									iconColor={Colors.PRIMARY}
								/>
							</FlexBox>
							<FlexBox>{children}</FlexBox>
						</FlexBox>
					</FlexBox>
				</FlexContainer>
			</PublicPageContainer>
		);
	})
);
SignInBase.propTypes = {
	children: PropTypes.element,
};
export default SignInBase;
