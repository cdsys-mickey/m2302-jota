import AllMessagesToolbar from "@/components/all-messages/AllMessagesToolbar";
import MsgListHeader from "@/components/all-messages/list/MsgListHeader";
import { MsgListViewContainer } from "@/components/all-messages/list/MsgListViewContainer";
import { FrameBanner, FrameBox } from "@/shared-components";
import { FormProvider, useForm } from "react-hook-form";

export const AllMessagesFrameContainer = () => {
	const searchForm = useForm();

	return (
		<FormProvider {...searchForm}>
			<FrameBox>
				{/* 標題 */}
				<FrameBanner title="推播訊息通知" alt="推播" />
				{/* 工具列 */}
				<AllMessagesToolbar />
				{/* 列表 */}
				<MsgListHeader />
				<MsgListViewContainer />
			</FrameBox>
		</FormProvider>
	);
};

AllMessagesFrameContainer.displayName = "MessagesFrameContainer";
