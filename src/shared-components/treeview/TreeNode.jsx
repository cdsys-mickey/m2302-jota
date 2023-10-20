import React from "react";
import TreeFolder from "./TreeFolder";
import TreeItemEx from "./TreeItemEx";

const TreeNode = ({ hasChild, childNodes, TreeNodeComponent, ...rest }) => {
	if (hasChild) {
		return (
			<TreeFolder
				childNodes={childNodes}
				TreeNodeComponent={TreeNodeComponent}
				{...rest}
			/>
		);
	}
	return <TreeItemEx {...rest} />;
};

export default React.memo(TreeNode);
