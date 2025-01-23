import Colors from "@/modules/md-colors";
import ModuleHeading from "@/shared-components/ModuleHeading";
import InboxIcon from "@mui/icons-material/Inbox";
import { useContext } from "react";
import { HomeContext } from "@/contexts/home/HomeContext";
import { useInit } from "@/shared-hooks/useInit";
import HomeWidget from "../HomeWidget";
import { ReviewWidgetListItemContainer } from "./ReviewWidgetListItemContainer";
import { useWindowSize } from "@/shared-hooks/useWindowSize";

export const ReviewWidgetContainer = () => {
	const home = useContext(HomeContext);
	const { height } = useWindowSize();

	const { getReview, reviewLoading, reviewData, reviewError } = home;

	useInit(() => {
		getReview();
	}, []);

	return (
		<HomeWidget
			loading={reviewLoading}
			data={reviewData}
			error={reviewError}
			height={height - 172}
			minHeight={height - 172}
			heading={
				<ModuleHeading
					icon={InboxIcon}
					text="待覆核"
					cssColor={Colors.HEADING}
				/>
			}
			ItemComponent={ReviewWidgetListItemContainer}
		/>
	);
};

ReviewWidgetContainer.displayName = "ReviewWidgetContainer";
