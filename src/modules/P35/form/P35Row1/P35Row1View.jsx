import { memo } from "react";
import PropTypes from "prop-types";
import { CheckboxEx, CheckboxExField, FlexTable, FlexTableCell, FlexTableRow } from "@/shared-components";

const P35Row1ViewComponent = (props) => {
	const { ...rest } = props;
	return (
		<FlexTable border={0} rowHeight={29} {...rest}>
			<FlexTableRow>
				<FlexTableCell flex={1} />
				<FlexTableCell w={130} px={1} align="right">
					<CheckboxExField
						typo
						// variant="outlined"
						fullWidth
						// shrink
						label="現結"
						name="clearOnSite1"
						defaultValue={false}
						dense
						size="small"
						slotProps={{
							label: {
								slotProps: {
									typography: {
										variant: "subtitle2"
									}
								},
								inline: true
							},
						}}
					/>
				</FlexTableCell>
				<FlexTableCell w={130} px={1} align="right">
					<CheckboxExField
						typo
						// variant="outlined"
						fullWidth
						// shrink
						label="現結"
						name="clearOnSite2"
						defaultValue={false}
						dense
						size="small"
						slotProps={{
							label: {
								slotProps: {
									typography: {
										variant: "subtitle2"
									}
								},
								inline: true
							},

						}}
					/>
				</FlexTableCell>
				<FlexTableCell w={130} px={1} align="right">
					<CheckboxExField
						typo
						// variant="outlined"
						fullWidth
						// shrink
						dense
						label="現結"
						name="clearOnSite3"
						defaultValue={false}
						size="small"
						slotProps={{
							label: {
								// labelPlacement: "start",
								slotProps: {
									typography: {
										variant: "subtitle2"
									}
								},
								inline: true
							},
						}}
					/>
				</FlexTableCell>
				<FlexTableCell w={10}>

				</FlexTableCell>
			</FlexTableRow>
		</FlexTable>
	);
}

P35Row1ViewComponent.propTypes = {

}
const P35Row1View = memo(P35Row1ViewComponent);
export default P35Row1View;