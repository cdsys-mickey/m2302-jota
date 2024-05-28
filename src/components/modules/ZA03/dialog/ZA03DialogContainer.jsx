import { ZA03Context } from "@/contexts/ZA03/ZA03Context";
import { forwardRef, useContext, useEffect, useMemo } from "react";
import Users from "@/modules/md-users";
import { DialogExContainer } from "@/shared-components/dialog/DialogExContainer";
import { useScrollable } from "@/shared-hooks/useScrollable";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { ZA03DialogContentContainer } from "../form/ZA03DialogContentContainer";
import Colors from "@/modules/md-colors";

export const ZA03DialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const { height } = useWindowSize();

	const za03 = useContext(ZA03Context);
	const { setSelectedTab, itemViewOpen, clearLoadAuth } = za03;

	const scrollable = useScrollable({
		height,
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

	// const handleReturn = useMemo(() => {
	// 	return za03.updating ? za03.confirmReturnReading : null;
	// }, [za03.confirmReturnReading, za03.updating]);

	// 對話框關閉時, 切回 INFO tab, 解除 loadAuthAction
	useEffect(() => {
		if (!itemViewOpen) {
			setSelectedTab(Users.Tabs.INFO);
			// cancelAuthEditing();
			clearLoadAuth();
		}
	}, [setSelectedTab, itemViewOpen, clearLoadAuth]);

	// useEffect(() => {
	// 	if (za03.itemDataReady) {
	// 		clearLoadAuthAction();
	// 	}
	// }, [clearLoadAuthAction, za03.itemDataReady]);

	// useEffect(() => {
	// 	if (itemDataReady) {
	// 		console.log(`za03 form reset`, itemData);
	// 		reset(itemData);
	// 		resetGridLoading();
	// 	}
	// }, [reset, resetGridLoading, itemData, itemDataReady]);

	return (
		// <FormProvider {...forms}>
		<DialogExContainer
			ref={ref}
			// fullScreen
			responsive
			fullWidth
			maxWidth="md"
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
			{/* <ZA03Form
					ref={ref}
					onSubmit={forms.handleSubmit(
						za03.onEditorSubmit,
						za03.onEditorSubmitError
					)}
					editing={za03.editing}
					updating={za03.updating}
					readWorking={za03.readWorking}
					data={za03.itemData}
					itemDataReady={za03.itemDataReady}
					selectedTab={za03.selectedTab}
					handleTabChange={za03.handleTabChange}
					infoDisabled={infoDisabled}
					authDisabled={authDisabled}
					deptDisabled={deptDisabled}
				/> */}
			<ZA03DialogContentContainer />
		</DialogExContainer>
		// </FormProvider>
	);
});

ZA03DialogContainer.displayName = "ZA03DialogContainer";
