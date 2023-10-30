import useA02 from "@/contexts/useA02";
import A02Grid from "./A02Grid";

const A02GridContainer = () => {
	const { data, loading, handleChange } = useA02();
	return (
		<A02Grid data={data} loading={loading} handleChange={handleChange} />
	);
};

A02GridContainer.displayName = "A02GridContainer";

export default A02GridContainer;
