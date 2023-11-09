import { forwardRef, memo } from "react";
import FrameAccordion from "./FrameAccordion";
import useAppFrame from "@/shared-contexts/app-frame/useAppFrame";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { useContext } from "react";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";

const FrameAccordionContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const {
			// Menu
			menus,
			handleMenuItemClickBy,
			selectedItem,
			// Accordion
			expanded,
			handleAccordionChange,
		} = useContext(AppFrameContext);

		const { height } = useWindowSize();

		return (
			<FrameAccordion
				ref={ref}
				height={height - 56}
				// menu
				menus={menus}
				handleItemClickBy={handleMenuItemClickBy}
				selectedItem={selectedItem}
				// Accordion
				expanded={expanded}
				handleAccordionChange={handleAccordionChange}
				{...rest}
			/>
		);
	})
);

export default FrameAccordionContainer;
