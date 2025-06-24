import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import AddIcon from "@mui/icons-material/Add";
import { useContext } from "react";
import { forwardRef, memo } from "react";
import { useMemo } from "react";
import { P41Context } from "./P41Context";

const P41CreateButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const p41 = useContext(P41Context);
		const { moduleAuthorityLoading, canCreate } = p41;
		const text = useMemo(() => {
			return "新增";
		}, []);

		if (moduleAuthorityLoading || !canCreate) {
			return false;
		}

		return (
			<ResponsiveButton
				ref={ref}
				variant="contained"
				startIcon={<AddIcon />}
				onClick={p41.handlePromptCreating}
				sx={{
					fontWeight: 600,
				}}
				{...rest}>
				{text}
			</ResponsiveButton>
		);
	})
);
P41CreateButtonContainer.displayName = "P41CreateButtonContainer";
export default P41CreateButtonContainer;



