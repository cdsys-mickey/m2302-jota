import ResponsiveButton from "@/shared-components/button/ResponsiveButton";
import AddIcon from "@mui/icons-material/Add";
import { useContext } from "react";
import { forwardRef, memo } from "react";
import { A16Context } from "../../../contexts/A16/A16Context";
import A16 from "../../../modules/md-a16";
import { useMemo } from "react";

const A16CreateButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const a16 = useContext(A16Context);
		const { moduleAuthorityLoading, canCreate } = a16;
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
				onClick={a16.promptCreating}
				sx={{
					fontWeight: 600,
				}}
				{...rest}>
				{text}
			</ResponsiveButton>
		);
	})
);
A16CreateButtonContainer.displayName = "A16CreateButtonContainer";
export default A16CreateButtonContainer;

