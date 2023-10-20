import React from "react";
import LoadingTypography from "@/shared-components/LoadingTypography";
import TreeItemEx from "./TreeItemEx";
import TreeNode from "./TreeNode";

const TreeFolder = ({
	nodeId,
	childNodes,
	LoadingComponent = LoadingTypography,
	TreeNodeComponent = TreeNode,
	...rest
}) => {
	return (
		<TreeItemEx nodeId={nodeId} {...rest}>
			{/* 子節點尚未載入，先顯示讀取指示 */}
			{!childNodes && (
				<TreeItemEx
					nodeId={`${nodeId}-loading`}
					IconComponent={LoadingComponent}
				/>
			)}
			{childNodes &&
				childNodes.map((node, index) => (
					<TreeNodeComponent key={`child-${index}`} {...node} />
				))}
		</TreeItemEx>
	);
};

export default React.memo(TreeFolder);
