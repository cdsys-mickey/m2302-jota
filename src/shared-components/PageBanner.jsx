import React from "react";
import { OperatorAvatarContainer } from "@/components/operator/OperatorAvatarContainer";
import FlexBox from "@/shared-components/FlexBox";
import { OperatorMenuContextProvider } from "@/contexts/OperatorMenuContext";

const borderStyles = (theme) => ({
	// paddingTop: {
	// 	xl: theme.spacing(2),
	// 	lg: theme.spacing(2),
	// 	md: theme.spacing(1),
	// 	sm: theme.spacing(1),
	// 	xs: 0,
	// },
	// paddingBottom: {
	// 	xl: theme.spacing(2),
	// 	lg: theme.spacing(2),
	// 	md: 0,
	// 	sm: 0,
	// 	xs: 0,
	// },
	paddingTop: theme.spacing(2),
	paddingBottom: theme.spacing(2),
	paddingLeft: {
		xl: theme.spacing(2),
		lg: theme.spacing(2),
		md: theme.spacing(1),
		sm: theme.spacing(1),
		xs: 0,
	},
	paddingRight: {
		xl: theme.spacing(2),
		lg: theme.spacing(2),
		md: theme.spacing(1),
		sm: theme.spacing(1),
		xs: 0,
	},
});

const PageBanner = ({
	treeWidth,
	// searchField,
	SearchFormComponent,
	appBanner,

	// METHODS
	...rest
}) => {
	return (
		<>
			<FlexBox inline fullWidth sx={[{}, (theme) => borderStyles(theme)]}>
				<FlexBox
					sx={[
						treeWidth && {
							width: treeWidth,
						},
					]}>
					{appBanner}
				</FlexBox>
				<FlexBox
					flex={1}
					sx={{
						display: {
							xl: "flex",
							lg: "flex",
							md: "flex",
							sm: "none",
							xs: "none",
						},
						width: {
							md: "100%",
						},
					}}>
					{SearchFormComponent && <SearchFormComponent />}
				</FlexBox>
				<FlexBox
					flex={1}
					sx={{
						display: {
							xl: "none",
							lg: "none",
							md: "none",
						},
					}}></FlexBox>
				<FlexBox
					justifyContent="flex-end"
					sx={{
						width: "8em",
					}}>
					<OperatorMenuContextProvider>
						<OperatorAvatarContainer />
					</OperatorMenuContextProvider>
				</FlexBox>
			</FlexBox>
		</>
	);
};
export default React.memo(PageBanner);
