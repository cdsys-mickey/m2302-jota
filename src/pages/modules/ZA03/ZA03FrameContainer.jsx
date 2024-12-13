import ZA03Toolbar from "@/components/jobs/ZA03/ZA03Toolbar";
import { ZA03AddAuthDialogContainer } from "@/components/jobs/ZA03/add-auth-dialog/ZA03AddAuthDialogContainer";
import { ZA03DialogContainer } from "@/components/jobs/ZA03/dialog/ZA03DialogContainer";
import ZA03ListHeader from "@/components/jobs/ZA03/list/ZA03ListHeader";
import { ZA03ListViewContainer } from "@/components/jobs/ZA03/list/ZA03ListViewContainer";
import Styles from "@/modules/md-styles";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { Box, useTheme } from "@mui/material";
import { useContext, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ZA03CopyAuthDialogContainer } from "../../../components/jobs/ZA03/copy-auth/ZA03CopyAuthDialogContainer";
import { UserSearchFieldContainer } from "../../../components/jobs/ZA03/search/UserSearchFieldContainer";
import { ZA03CopyAuthProvider } from "../../../contexts/ZA03/ZA03CopyAuthProvider";

export const ZA03FrameContainer = () => {
	const appFrame = useContext(AppFrameContext);
	const searchForm = useForm();
	const theme = useTheme();
	const boxStyles = useMemo(
		() => Styles.ofFrameBox({ theme, drawerOpen: appFrame.drawerOpen }),
		[appFrame.drawerOpen, theme]
	);

	return (
		<FormProvider {...searchForm}>
			<Box sx={[boxStyles]}>
				{/* 標題 */}
				<FrameBannerContainer>
					{<UserSearchFieldContainer name="q" />}
				</FrameBannerContainer>
				{/* 工具列 */}
				<ZA03Toolbar />
				{/* 列表 */}
				<ZA03ListHeader />
				<ZA03ListViewContainer />
				{/* 對話框 */}
				<ZA03DialogContainer />
				{/* 新增權限 */}
				<ZA03AddAuthDialogContainer />
				{/* 複製權限 */}
				<ZA03CopyAuthProvider>
					<ZA03CopyAuthDialogContainer />
				</ZA03CopyAuthProvider>
			</Box>
		</FormProvider>
	);
};

ZA03FrameContainer.displayName = "ZA03FrameContainer";
