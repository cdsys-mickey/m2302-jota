import DSGContextMenu from "./DSGContextMenu";

const defaultRenderItem = (item) => {
	if (item.type === "CUT") {
		return <>剪下</>;
	}

	if (item.type === "COPY") {
		return <>複製</>;
	}

	if (item.type === "PASTE") {
		return <>貼上</>;
	}

	if (item.type === "DELETE_ROW") {
		return <>刪除此列</>;
	}

	if (item.type === "DELETE_ROWS") {
		return (
			<>
				刪除第 <b>{item.fromRow}</b> 到 <b>{item.toRow} 列</b>
			</>
		);
	}

	if (item.type === "INSERT_ROW_BELLOW") {
		return <>往下新增</>;
	}

	if (item.type === "DUPLICATE_ROW") {
		return <>複製整列</>;
	}

	if (item.type === "DUPLICATE_ROWS") {
		return (
			<>
				複製 <b>第 {item.fromRow}</b> 到 <b>{item.toRow} 列</b>
			</>
		);
	}

	return item.type;
};

const defaultFilterItem = () => {
	return true;
};

export const createDSGContextMenuComponent =
	({ renderItem = defaultRenderItem, filterItem = defaultFilterItem } = {}) =>
	// eslint-disable-next-line react/display-name
	(props) => {
		return (
			<DSGContextMenu
				renderItem={renderItem}
				filterItem={filterItem}
				{...props}
			/>
		);
	};
