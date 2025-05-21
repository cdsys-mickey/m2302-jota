import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import AddIcon from "@mui/icons-material/Add";
import { useContext } from "react";
import { forwardRef, memo } from "react";
import { G08Context } from "./G08Context";
import { useMemo } from "react";

const G08CreateButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const g08 = useContext(G08Context);
		const { moduleAuthorityLoading, canCreate } = g08;
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
				onClick={g08.promptCreating}
				sx={{
					fontWeight: 600,
				}}
				{...rest}>
				{text}
			</ResponsiveButton>
		);
	})
);
G08CreateButtonContainer.displayName = "G08CreateButtonContainer";
export default G08CreateButtonContainer;


