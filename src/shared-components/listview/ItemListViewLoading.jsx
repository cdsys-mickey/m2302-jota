import { Container } from "@mui/material";
import FlexBox from "@/shared-components/FlexBox";
import LoadingTypography from "@/shared-components/LoadingTypography";

const ItemListViewLoading = ({ children, ...rest }) => {
	return (
		<Container maxWidth="xs">
			<FlexBox pt="50%" justifyContent="center">
				<LoadingTypography>讀取中...</LoadingTypography>
			</FlexBox>
		</Container>
	);
};

export default ItemListViewLoading;
