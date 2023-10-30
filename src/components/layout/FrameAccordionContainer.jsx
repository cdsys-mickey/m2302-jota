import { forwardRef, memo } from "react";
import FrameAccordion from "./FrameAccordion";
import useAppFrame from "@/shared-contexts/useAppFrame";
import useWindowSize from "@/shared-hooks/useWindowSize";

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
		} = useAppFrame();

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
