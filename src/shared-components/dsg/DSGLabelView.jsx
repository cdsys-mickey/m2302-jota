import { memo } from "react";
import { FormFieldLabel } from "..";

const DSGLabelViewComponent = (props) => {
	const { ...rest } = props;
	return (
		<FormFieldLabel
			inline
			emptyText=""
			slotProps={{
				typography: {
					color: "text.secondary",
					sx: {
						fontWeight: 0
					}
				}
			}}
			{...rest}
		/>
	);
}

DSGLabelViewComponent.propTypes = {

}
const DSGLabelView = memo(DSGLabelViewComponent);
export default DSGLabelView;