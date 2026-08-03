import REBForm from "./REBForm";
import { useREB } from "./useREB";

export const REBFormContainer = () => {
	const reb = useREB();
	return (
		<REBForm
			selectedTab={reb.selectedTab}
			handleTabChange={reb.handleTabChange}
		/>
	);
};

REBFormContainer.displayName = "REBFormContainer";









