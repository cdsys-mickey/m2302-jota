import { CrudProvider } from "@/contexts/crud/CrudProvider";
import { InfiniteLoaderProvider } from "@/contexts/infinite-loader/InfiniteLoaderProvider";
// import { lazy } from "react";
import { A01FrameContainer } from "@/modules/A01/A01FrameContainer";
import { A01Provider } from "@/modules/A01/A01Provider";

const A01Page = () => {
	return (
		<CrudProvider>
			<InfiniteLoaderProvider>
				<A01Provider>
					<A01FrameContainer />
				</A01Provider>
			</InfiniteLoaderProvider>
		</CrudProvider>
	)
}

A01Page.displayName = "A01Page";
export default A01Page;