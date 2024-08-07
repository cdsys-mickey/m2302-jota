import { Typography } from "@mui/material";
import { DsgTest4GridContainer } from "../DsgTest4GridContainer";
import { DsgTest4GridProvider } from "./DsgTest4GridProvider";
import { DSGTest4Provider } from "./DSGTest4Provider";

const DSGTest4Page = (props) => {
	const { ...rest } = props;
	return (
		<>
			<DSGTest4Provider>
				<DsgTest4GridProvider>
					<DsgTest4GridContainer />
				</DsgTest4GridProvider>
			</DSGTest4Provider>
			<Typography variant="subtitle1">
				* 最後是 TextComponentEx
			</Typography>
		</>
	);
};

DSGTest4Page.propTypes = {};

DSGTest4Page.displayName = "DSGTest4Page";
export default DSGTest4Page;
