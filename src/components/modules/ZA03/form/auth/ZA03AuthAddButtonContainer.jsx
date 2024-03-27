import ResponsiveButton from "@/shared-components/responsive/ResponsiveButton";
import AddIcon from "@mui/icons-material/Add";
import { forwardRef, memo, useContext, useMemo } from "react";
import { ZA03Context } from "@/contexts/ZA03/ZA03Context";
import { useCallback } from "react";

export const ZA03AuthAddButtonContainer = forwardRef((props, ref) => {
	const { ...rest } = props;
	const za03 = useContext(ZA03Context);

	const handleClick = useCallback(() => {
		za03.promptAddAuth();
	}, [za03]);

	const text = useMemo(() => {
		return "新增作業";
	}, []);

	// if (za03.readOnly) {
	if (za03.authEditing) {
		return false;
	}

	return (
		<ResponsiveButton
			ref={ref}
			startIcon={<AddIcon />}
			onClick={handleClick}
			sx={{
				fontWeight: 600,
			}}
			{...rest}>
			{text}
		</ResponsiveButton>
	);
});
ZA03AuthAddButtonContainer.displayName = "ZA03AuthAddButtonContainer";
