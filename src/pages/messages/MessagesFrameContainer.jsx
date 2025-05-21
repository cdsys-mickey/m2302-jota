import MsgToolbar from "@/components/messages/MsgToolbar";
import MsgListHeader from "@/components/messages/list/MsgListHeader";
import { MsgListViewContainer } from "@/components/messages/list/MsgListViewContainer";
import { FrameBanner, FrameBox } from "@/shared-components";
import { FormProvider, useForm } from "react-hook-form";

export const MessagesFrameContainer = () => {
	const searchForm = useForm();

	return (
		<FormProvider {...searchForm}>
			<FrameBox>
				{/* 標題 */}
				<FrameBanner title="推播訊息通知" alt="推播" />
				{/* 工具列 */}
				<MsgToolbar />
				{/* 列表 */}
				<MsgListHeader />
				<MsgListViewContainer />
			</FrameBox>
		</FormProvider>
	);
};

MessagesFrameContainer.displayName = "MessagesFrameContainer";
