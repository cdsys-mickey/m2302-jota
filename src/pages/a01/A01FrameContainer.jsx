import { useContext } from "react";
import A01Frame from "./ZZA01Frame";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import { useMemo } from "react";
import Styles from "@/modules/md-styles";
import { Box, useTheme } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { A01DialogContainer } from "../../components/modules/A01/dialog/A01DialogContainer";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { ProdSearchFieldContainer } from "@/components/modules/A01/search/ProdSearchFieldContainer";
import A01Toolbar from "@/components/modules/A01/A01Toolbar";
import A01ListHeader from "@/components/modules/A01/list/A01ListHeader";
import { A01ListViewContainer } from "@/components/modules/A01/list/A01ListViewContainer";
import { StdPrintDialogContainer } from "../../components/std-print/StdPrintDialogContainer";
import { StdPrintProvider } from "../../contexts/std-print/StdPrintProvider";
import A01 from "../../modules/md-a01";
import { A01Context } from "../../contexts/A01/A01Context";
import { useMatch } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useInit } from "../../shared-hooks/useInit";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useSyncQuery } from "../../shared-hooks/useSyncQuery";
import { useCallback } from "react";

export const A01FrameContainer = () => {
	const appFrame = useContext(AppFrameContext);
	const { clearParams } = useContext(AppFrameContext);
	const searchForm = useForm();
	const theme = useTheme();
	const a01 = useContext(A01Context);
	const { selectById } = a01;
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

	useSyncQuery("id", handleQuerySync);

	return (
		<Box sx={[boxStyles]}>
			<StdPrintProvider
				tableName="StoreFile_F"
				paramsToJsonData={A01.paramsToJsonData(a01.mode)}>
				<FormProvider {...searchForm}>
					{/* 標題 */}
					<FrameBannerContainer>
						{<ProdSearchFieldContainer name="qs" />}
					</FrameBannerContainer>
					{/* 工具列 */}
					<A01Toolbar />
					{/* 列表 */}
					<A01ListHeader />
					<A01ListViewContainer />
				</FormProvider>

				{/* 對話框 */}
				<A01DialogContainer />
				<StdPrintDialogContainer />
			</StdPrintProvider>
		</Box>
	);
};

A01FrameContainer.displayName = "A01Frame";
