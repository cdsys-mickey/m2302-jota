import REBRestoreTabView from "./REBPosTabView";

const REBPosTabContainer = (props) => {
	const { ...rest } = props;


	return <REBRestoreTabView  {...rest} />
}

REBPosTabContainer.displayName = "REBPosTabContainer";
export default REBPosTabContainer;
