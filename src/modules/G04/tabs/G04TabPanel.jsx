import { TabPanel } from "@mui/lab";

const G04TabPanel = (props) => {
	const { ...rest } = props;
	return (
		<TabPanel {...rest} sx={{
			paddingBottom: 0
		}}></TabPanel>
	);
}

export default G04TabPanel