import { memo, useMemo } from "react";
import { FlexBox } from "shared-components";
import { ButtonEx } from "@/shared-components";

const ToastExView = memo((props) => {
	const { message, onAction, actionText, slotProps, theme, ...rest } = props;

	const _actionText = useMemo(() => {
		return actionText || "(動作)";
	}, [actionText]);

	const isWhite = useMemo(() => {
		return theme && theme != "light"
	}, [theme])

	return (
		<FlexBox {...rest}>
			<FlexBox flex={1}>
				{message}
			</FlexBox>
			<ButtonEx
				onClick={onAction}
				{...slotProps?.button}
				{...(isWhite && {
					color: "white"
				})}
			>
				{_actionText}
			</ButtonEx>
		</FlexBox>
	);
})

ToastExView.propTypes = {

}

ToastExView.displayName = "ToastExView";
export default ToastExView;