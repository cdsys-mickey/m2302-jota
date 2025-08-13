import REBSalesTabView from "./REBSalesTabView";

const REBSalesTabContainer = (props) => {
	const { ...rest } = props;

	return <REBSalesTabView {...rest} />
}

REBSalesTabContainer.displayName = "REBSalesTabContainer";
export default REBSalesTabContainer;
