import ZA03Toolbar from "@/components/jobs/ZA03/ZA03Toolbar";
import { ZA03AddAuthDialogContainer } from "@/components/jobs/ZA03/add-auth-dialog/ZA03AddAuthDialogContainer";
import { ZA03DialogContainer } from "@/components/jobs/ZA03/dialog/ZA03DialogContainer";
import ZA03ListHeaderContainer from "@/components/jobs/ZA03/list/ZA03ListHeaderContainer";
import { ZA03ListViewContainer } from "@/components/jobs/ZA03/list/ZA03ListViewContainer";
import { FrameBanner, FrameBox } from "@/shared-components";
import { FormProvider, useForm } from "react-hook-form";
import { ZA03CopyAuthDialogContainer } from "@/components/jobs/ZA03/copy-auth/ZA03CopyAuthDialogContainer";
import { UserSearchFieldContainer } from "@/components/jobs/ZA03/search/UserSearchFieldContainer";
import { ZA03CopyAuthProvider } from "@/contexts/ZA03/ZA03CopyAuthProvider";

export const ZA03FrameContainer = () => {
	const searchForm = useForm();

	return (
		<FormProvider {...searchForm}>
			<FrameBox>
				{/* 標題 */}
				<FrameBanner>
					{<UserSearchFieldContainer name="q" />}
				</FrameBanner>
				{/* 工具列 */}
				<ZA03Toolbar />
				{/* 列表 */}
				<ZA03ListHeaderContainer />
				<ZA03ListViewContainer />
				{/* 對話框 */}
				<ZA03DialogContainer />
				{/* 新增權限 */}
				<ZA03AddAuthDialogContainer />
				{/* 複製權限 */}
				<ZA03CopyAuthProvider>
					<ZA03CopyAuthDialogContainer />
				</ZA03CopyAuthProvider>
			</FrameBox>
		</FormProvider>
	);
};

ZA03FrameContainer.displayName = "ZA03FrameContainer";
