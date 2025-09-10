import BackgroundImage from "@/images/rm218batch4-ning-34_2.jpg";
import FlexBox from "@/shared-components/FlexBox";
import { forwardRef, memo } from "react";

import Colors from "@/modules/Colors.mjs";
import FlexContainer from "@/shared-components/FlexContainer";
import ModuleHeading from "@/shared-components/ModuleHeading";
import { PublicPage } from "@/shared-pages";
import LockIcon from "@mui/icons-material/Lock";
import PropTypes from "prop-types";

const SignInBase = memo(
	forwardRef((props, ref) => {
		const { children } = props;

		return (
			<PublicPage
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
					// alignItems="center"
					sx={{ paddingTop: "18vh" }}
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
			</PublicPage>
		);
	})
);
SignInBase.propTypes = {
	children: PropTypes.element,
};
export default SignInBase;
