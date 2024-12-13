import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { Box, useTheme } from "@mui/material";
import { useContext, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import C02ListToolbar from "@/components/jobs/C02/list/C02ListToolbar";
import { C02DialogContainer } from "@/components/jobs/C02/dialog/C02DialogContainer";
import C02ListHeader from "@/components/jobs/C02/list/C02ListHeader";
import { C02ListViewContainer } from "@/components/jobs/C02/list/C02ListViewContainer";
import { C02SearchFieldContainer } from "@/components/jobs/C02/C02SearchFieldContainer";
import Styles from "@/modules/md-styles";
import C02 from "../../../modules/md-c02";
import { useCallback } from "react";
import { useQuerySync } from "../../../shared-hooks/useQuerySync";
import { C02Context } from "../../../contexts/C02/C02Context";
import C02Drawer from "../../../components/jobs/C02/C02Drawer";
import MuiStyles from "@/shared-modules/sd-mui-styles";

export const C02FrameContainer = () => {
	const appFrame = useContext(AppFrameContext);
	const c02 = useContext(C02Context);
	const { selectById } = c02;
	const searchForm = useForm({
		defaultValues: {
			listMode: C02.getOptionById(C02.ListModes.NOT_REVIEWED),
		},
	});
	const theme = useTheme();
	const boxStyles = useMemo(
		() => Styles.ofFrameBox({ theme, drawerOpen: appFrame.drawerOpen }),
		[appFrame.drawerOpen, theme]
	);

	const handleQuerySync = useCallback(
		(newValue) => {
			if (newValue) {
				selectById(newValue);
			}
		},
		[selectById]
	);

	useQuerySync("id", handleQuerySync);

	return (
		<Box sx={[boxStyles]}>
			<FormProvider {...searchForm}>
				{/* 標題 */}
				<FrameBannerContainer>
					{<C02SearchFieldContainer name="q" />}
				</FrameBannerContainer>
				{/* 工具列 */}
				<C02ListToolbar />

				{/* 列表 */}
				<C02ListHeader />
				<C02ListViewContainer />
			</FormProvider>

			{/* 對話框 */}
			<C02DialogContainer />

		</Box>
	);
};

C02FrameContainer.displayName = "C02FrameContainer";
