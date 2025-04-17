import { ZA03Context } from "@/contexts/ZA03/ZA03Context";
import { forwardRef, useContext, useEffect, useMemo } from "react";
import { DialogExContainer } from "@/shared-components/dialog/DialogExContainer";
import { useScrollable } from "@/shared-hooks/useScrollable";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { ZA03DialogContentContainer } from "../form/ZA03DialogContentContainer";
import Colors from "@/modules/md-colors";
import { FormProvider, useForm } from "react-hook-form";
import ZA03 from "@/modules/ZA03.mjs";

export const ZA03DialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const { height } = useWindowSize();

	const za03 = useContext(ZA03Context);
	const {
		setSelectedTab,
		itemViewOpen,
		clearLoadAuth,
		editing,
		authGridEditing,
		setAuthEditingMode,
	} = za03;
	const form = useForm({
		defaultValues: {
			depts: [],
		},
	});
	const { reset } = form;

	const _height = useMemo(() => {
		return height - 120
	}, [height])

	const scrollable = useScrollable({
		height: _height,
		alwaysShowThumb: true,
		scrollerBackgroundColor: "transparent",
	});

	const handleClose = useMemo(() => {
		return za03.creating
			? za03.confirmQuitCreating
			: za03.updating
				? za03.confirmQuitUpdating
				: za03.reading
					? za03.cancelAction
					: null;
	}, [
		za03.cancelAction,
		za03.confirmQuitCreating,
		za03.confirmQuitUpdating,
		za03.creating,
		za03.reading,
		za03.updating,
	]);

	// 對話框關閉時, 切回 INFO tab, 解除 loadAuthAction
	useEffect(() => {
		if (!itemViewOpen) {
			setSelectedTab(ZA03.Tabs.INFO);
			setAuthEditingMode(null);
			// cancelAuthEditing();
			clearLoadAuth();
		}
	}, [setSelectedTab, itemViewOpen, clearLoadAuth, setAuthEditingMode]);

	const { itemDataReady, itemData } = za03;

	useEffect(() => {
		if (itemDataReady) {
			console.log(`za03 form reset`, itemData);
			reset(itemData);
		}
	}, [reset, itemData, itemDataReady]);

	const memoisedTitle = useMemo(() => {
		if (za03.creating) {
			return "建立使用者";
			// } else if (za03.updating) {
			// 	return "修改使用者";
		} else {
			return "使用者內容";
		}
	}, [za03.creating]);

	const hideCloseButton = useMemo(() => {
		return editing || authGridEditing;
	}, [authGridEditing, editing]);



	return (
		<FormProvider {...form}>
			<DialogExContainer
				ref={ref}
				title={memoisedTitle}
				responsive
				fullWidth
				maxWidth="lg"
				hideCloseButton={hideCloseButton}
				// TitleButtonsComponent={ZA03DialogTitleButtonsContainer}
				open={za03.itemViewOpen}
				onClose={handleClose}
				// onReturn={handleReturn}
				sx={{
					"& .MuiDialog-paper": {
						backgroundColor: Colors.DIALOG_BG,
					},
				}}
				contentSx={[
					{
						minHeight: "30em",
						paddingTop: 0,
						// paddingLeft: 0,
						// paddingRight: 0,
					},
					scrollable.scroller,
				]}
				{...rest}>
				<form>
					<ZA03DialogContentContainer />
				</form>
			</DialogExContainer>
		</FormProvider>
	);
});

ZA03DialogContainer.displayName = "ZA03DialogContainer";
