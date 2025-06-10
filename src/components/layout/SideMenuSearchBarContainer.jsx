import { SideMenuContext } from "@/contexts/SideMenuContext";
import SideMenuSearchBar from "@/shared-components/side-menu/SideMenuSearchBar";
import { AppFrameContext } from "@/shared-contexts/app-frame/AppFrameContext";
import useSearchField from "@/shared-hooks/useSearchField";
import PropTypes from "prop-types";
import { forwardRef, useContext, useEffect, useRef } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useHotkeys } from "react-hotkeys-hook";
import { AuthContext } from "@/contexts/auth/AuthContext";

const SideMenuSearchBarContainer = forwardRef((props, ref) => {
	const { name = "q", ...rest } = props;

	const inputRef = useRef(null);
	const sideMenu = useContext(SideMenuContext);
	const { onAuthoritiesChange } = sideMenu;

	const auth = useContext(AuthContext);
	const { authorities } = auth;

	const form = useFormContext();
	const { handleHomeClick, handleToggleDrawerOpen } = useContext(AppFrameContext);

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

	const q = useWatch({
		name: name,
		// control,
	});

	useEffect(() => {
		console.log(`q:${q}`);
	}, [q]);

	useEffect(() => {
		// console.log("authorities fetched from AuthContext", authorities);
		onAuthoritiesChange(authorities, q);
	}, [authorities, onAuthoritiesChange, q]);

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
					onClear={searchField.handleClear}
					onHomeClick={handleHomeClick}
					onToggleDrawerOpen={handleToggleDrawerOpen}
					// gotoMessages={gotoMessages}
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
