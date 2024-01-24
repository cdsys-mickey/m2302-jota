import ResponsiveButton from "@/shared-components/responsive/ResponsiveButton";
import AddIcon from "@mui/icons-material/Add";
import { useContext } from "react";
import { forwardRef, memo } from "react";
import { A01Context } from "../../../contexts/A01/A01Context";
import A01 from "../../../modules/md-a01";
import { useMemo } from "react";

const A01CreateButtonContainer = memo(
	forwardRef((props, ref) => {
		const { ...rest } = props;
		const a01 = useContext(A01Context);
		const { moduleAuthorityLoading, canCreate } = a01;
		const text = useMemo(() => {
			if (a01.mode === A01.Mode.NEW_PROD) {
				return "新增新商品";
			}
			return "新增商品";
		}, [a01.mode]);

		if (moduleAuthorityLoading || !canCreate) {
			return false;
		}

		return (
			<ResponsiveButton
				ref={ref}
				variant="contained"
				startIcon={<AddIcon />}
				onClick={a01.createPrompt}
				sx={{
					fontWeight: 600,
				}}
				{...rest}>
				{text}
			</ResponsiveButton>
		);
	})
);
A01CreateButtonContainer.displayName = "A01CreateButtonContainer";
export default A01CreateButtonContainer;
