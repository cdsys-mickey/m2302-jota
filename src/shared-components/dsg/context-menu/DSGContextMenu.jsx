import { memo } from "react";
import PropTypes from "prop-types";
import { useRef } from "react";
import { useCallback } from "react";
import { useDocumentEventListener } from "../../../shared-hooks/useDocumentEventListener";

const DSGContextMenu = memo((props) => {
	const { clientX, clientY, items, close, renderItem, filterItem } = props;
	const containerRef = useRef();

	const onClickOutside = useCallback(
		(e) => {
			const clickInside = containerRef.current?.contains(e.target);

			if (!clickInside) {
				close();
			}
		},
		[close]
	);
	useDocumentEventListener("mousedown", onClickOutside);

	return (
		<div
			className="dsg-context-menu"
			style={{ left: clientX + "px", top: clientY + "px" }}
			ref={containerRef}>
			{items.filter(filterItem).map((item) => (
				<div
					key={item.type}
					onClick={item.action}
					className="dsg-context-menu-item">
					{renderItem(item)}
				</div>
			))}
		</div>
	);
});

DSGContextMenu.displayName = "DSGContextMenu";

DSGContextMenu.propTypes = {
	children: PropTypes.func,
	items: PropTypes.array,
	clientX: PropTypes.number,
	clientY: PropTypes.number,
	close: PropTypes.func,
	// CUSTOM PROPS
	renderItem: PropTypes.func,
	filterItem: PropTypes.func,
};

export default DSGContextMenu;
