import ActionState from "@/shared-constants/action-state";
import { forwardRef, useContext, useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { DialogExContainer } from "../../../../shared-components/dialog/DialogExContainer";
import { useScrollable } from "../../../../shared-hooks/useScrollable";
import { useWindowSize } from "../../../../shared-hooks/useWindowSize";
import ZA03Form from "../form/ZA03Form";
import { ZA03DialogTitleButtonsContainer } from "./buttons/ZA03DialogTitleButtonsContainer";
import { ZA03Context } from "@/contexts/ZA03/ZA03Context";
import Users from "../../../../modules/md-users";

export const ZA03DialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const { height } = useWindowSize();
	const forms = useForm({
		defaultValues: {},
	});
	const { reset } = forms;
	const za03 = useContext(ZA03Context);
	const { setSelectedTab, resetGridLoading } = za03;

	const title = useMemo(() => {
		if (za03.creating) {
			return "新增";
		} else if (za03.updating) {
			return "修改";
		} else {
			return "內容";
		}
	}, [za03.creating, za03.updating]);

	const scrollable = useScrollable({
		height,
		alwaysShowThumb: true,
		scrollerBackgroundColor: "transparent",
	});

	const infoDisabled = useMemo(() => {
		return !za03.readOnly;
	}, [za03.readOnly]);

	const authDisabled = useMemo(() => {
		return za03.editing;
	}, [za03.editing]);

	const deptDisabled = useMemo(() => {
		return true;
	}, []);

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

	const handleReturn = useMemo(() => {
		return za03.updating ? za03.confirmReturnReading : null;
	}, [za03.confirmReturnReading, za03.updating]);

	useEffect(() => {
		if (!za03.itemViewOpen) {
			setSelectedTab(Users.Tabs.INFO);
		}
	}, [setSelectedTab, za03.itemViewOpen]);

	useEffect(() => {
		// if (za03.readState === ActionState.DONE && !!za03.itemData) {
		if (za03.itemDataReady) {
			console.log(`za03 form reset`, za03.itemData);
			reset(za03.itemData);
			resetGridLoading();
		}
	}, [reset, resetGridLoading, za03.itemData, za03.itemDataReady]);

	return (
		<FormProvider {...forms}>
			<DialogExContainer
				title={title}
				ref={ref}
				// fullScreen
				responsive
				fullWidth
				maxWidth="md"
				TitleButtonsComponent={ZA03DialogTitleButtonsContainer}
				open={za03.itemViewOpen}
				onClose={handleClose}
				onReturn={handleReturn}
				sx={{
					"& .MuiDialog-paper": {
						backgroundColor: "rgb(241 241 241)",
					},
				}}
				contentSx={[
					{
						minHeight: "30em",
					},
					scrollable.scroller,
				]}
				{...rest}>
				<ZA03Form
					ref={ref}
					onSubmit={forms.handleSubmit(
						za03.onEditorSubmit,
						za03.onEditorSubmitError
					)}
					editing={za03.editing}
					updating={za03.updating}
					readWorking={za03.readWorking}
					data={za03.itemData}
					dataLoaded={za03.itemDataLoaded}
					selectedTab={za03.selectedTab}
					handleTabChange={za03.handleTabChange}
					infoDisabled={infoDisabled}
					authDisabled={authDisabled}
					deptDisabled={deptDisabled}
				/>
			</DialogExContainer>
		</FormProvider>
	);
});

ZA03DialogContainer.displayName = "ZA03DialogContainer";
