import G07RestoreTabView from "./G07RestoreTabView";

const G07RestoreTabContainer = (props) => {
	const { ...rest } = props;


	return <G07RestoreTabView  {...rest} />
}

G07RestoreTabContainer.displayName = "G07RestoreTabContainer";
export default G07RestoreTabContainer;