import useProtectedLayout from "@/shared-contexts/useProtectedLayout";
import { forwardRef, memo } from "react";
import SideMenu from "./SideMenu";

const SideMenuContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const {
			// Menu
			menus,
			handleMenuItemClick,
			selectedItem,
			// Accordion
			expanded,
			handleAccordionChange,
		} = useProtectedLayout();

		return (
			<SideMenu
				ref={ref}
				// menu
				menus={menus}
				handleItemClick={handleMenuItemClick}
				selectedItem={selectedItem}
				// Accordion
				expanded={expanded}
				handleAccordionChange={handleAccordionChange}
				{...rest}
			/>
		);
	})
);

export default SideMenuContainer;
