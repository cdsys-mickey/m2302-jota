import { A22Context } from "@/contexts/A22/A22Context";
import A22Frame from "./A22Frame";
import { useContext } from "react";

export const A22FrameContainer = () => {
	const a22 = useContext(A22Context);

	return (<A22Frame loading={a22.gridLoading} />);
};

A22FrameContainer.displayName = "A22Frame";
