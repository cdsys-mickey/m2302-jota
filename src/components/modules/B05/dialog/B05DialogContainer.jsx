import { B05Context } from "@/contexts/B05/B05Context";
import { DialogExContainer } from "@/shared-components/dialog/DialogExContainer";
import { useScrollable } from "@/shared-hooks/useScrollable";
import { useWindowSize } from "@/shared-hooks/useWindowSize";
import { forwardRef, useContext, useMemo } from "react";

export const B05DialogContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const { height } = useWindowSize();

	const b05 = useContext(B05Context);

	const scrollable = useScrollable({
		height,
		alwaysShowThumb: true,
		scrollerBackgroundColor: "transparent",
	});

	const handleClose = useMemo(() => {
		return b05.creating
			? b05.confirmQuitCreating
			: b05.updating
			? b05.confirmQuitUpdating
			: b05.reading
			? b05.cancelAction
			: null;
	}, [
		b05.cancelAction,
		b05.confirmQuitCreating,
		b05.confirmQuitUpdating,
		b05.creating,
		b05.reading,
		b05.updating,
	]);

	return (
		<DialogExContainer
			ref={ref}
			// fullScreen
			responsive
			fullWidth
			maxWidth="md"
			// TitleButtonsComponent={B05DialogTitleButtonsContainer}
			open={b05.itemViewOpen}
			onClose={handleClose}
			// onReturn={handleReturn}
			sx={{
				"& .MuiDialog-paper": {
					backgroundColor: "rgb(241 241 241)",
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
			{...rest}></DialogExContainer>
	);
});

B05DialogContainer.displayName = "B05DialogContainer";
