import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import TreeItemEx from "./TreeItemEx";

const CollapseTreeNodeSet = ({
	nodeId,
	collapsed = true,
	nodes,
	TreeNodeComponent,
	...rest
}) => {
	// const [expanded, setExpanded] = useState(false);

	// const handleClick = useCallback(() => {
	// 	setExpanded(true);
	// }, []);

	// return (
	// 	<>
	// 		<TreeItemEx
	// 			nodeId={nodeId}
	// 			IconComponent={ArrowDropDownIcon}
	// 			onClick={handleClick}
	// 			{...rest}
	// 		/>
	// 		<Collapse in={expanded}>
	// 			{nodes &&
	// 				nodes.map((node, index) => (
	// 					<TreeNodeComponent
	// 						key={`${nodeId}-${index}`}
	// 						{...node}
	// 					/>
	// 				))}
	// 		</Collapse>
	// 	</>
	// );
	if (collapsed) {
		return (
			<TreeItemEx
				nodeId={nodeId}
				IconComponent={ArrowDropDownIcon}
				{...rest}
			/>
		);
	}
	return (
		<>
			{nodes &&
				nodes.map((node, index) => (
					<TreeNodeComponent key={`${nodeId}-${index}`} {...node} />
				))}
		</>
	);
};

export default CollapseTreeNodeSet;
