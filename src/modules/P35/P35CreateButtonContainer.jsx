import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import AddIcon from "@mui/icons-material/Add";
import { useContext } from "react";
import { forwardRef, memo } from "react";
import { useMemo } from "react";
import { P35Context } from "./P35Context";

const P35CreateButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const p35 = useContext(P35Context);
		const { moduleAuthorityLoading, canCreate } = p35;
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
				onClick={p35.handlePromptCreating}
				sx={{
					fontWeight: 600,
				}}
				{...rest}>
				{text}
			</ResponsiveButton>
		);
	})
);
P35CreateButtonContainer.displayName = "P35CreateButtonContainer";
export default P35CreateButtonContainer;


