import SideMenuSearchBar from "@/shared-components/side-menu/SideMenuSearchBar";
import useSearchField from "@/shared-hooks/useSearchField";
import { forwardRef, memo, useContext, useRef } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { useHotkeys } from "react-hotkeys-hook";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import PropTypes from "prop-types";
import { SideMenuContext } from "@/contexts/SideMenuContext";
import { useScrollTrigger } from "@mui/material";
import { useReactWindowScroll } from "../../shared-hooks/react-window/useReactWindowScroll";

const SideMenuSearchBarContainer = forwardRef((props, ref) => {
	const { name = "q", ...rest } = props;

	const inputRef = useRef(null);
	const sideMenu = useContext(SideMenuContext);

	// const { mobile } = useContext(ResponsiveContext);
	const form = useFormContext();
	const { handleHomeClick } = useContext(AppFrameContext);
	// const form = useForm();

	const searchField = useSearchField({
		inputRef,
		onChange: (v) => {
			form.setValue(name, v);
		},
	});

	useHotkeys("ctrl+F9", searchField.handleFocus, {
		enableOnFormTags: true,
	});

	const escRef = useHotkeys("esc", searchField.handleClear, {
		enableOnFormTags: true,
	});

	// const trigger = useScrollTrigger({
	// 	disableHysteresis: true,
	// 	threshold: 0,
	// });
	// const { scrollOffset, onScroll } = useReactWindowScroll({ debounce: 20 });

	return (
		<div ref={escRef}>
			{/* <FormProvider {...form}>*/}
			<form
				onSubmit={form.handleSubmit(
					sideMenu.onSubmit,
					sideMenu.onSubmitError
				)}>
				<SideMenuSearchBar
					name={name}
					ref={ref}
					inputRef={inputRef}
					// onToggleDrawerOpen={
					// 	mobile ? handleToggleDrawerOpen : undefined
					// }
					onClear={searchField.handleClear}
					// onScroll={onScroll}
					// scrollOffset={scrollOffset}
					// onSubmit={}
					onHomeClick={handleHomeClick}
					// onInputChange={onInputChange}
					// onClear={handleClear}
					// elevation={trigger > 0 ? 4 : 0}
					// elevation={scrollOffset > 0 ? 4 : 0}
					{...rest}
				/>
			</form>
			{/* </FormProvider> */}
		</div>
	);
});
SideMenuSearchBarContainer.displayName = "SideMenuSearchBarContainer";
SideMenuSearchBarContainer.propTypes = {
	name: PropTypes.string,
};
export default SideMenuSearchBarContainer;
