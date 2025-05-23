import { Route, Routes } from "react-router-dom";

import HomeContainer from "@/pages/home/HomeContainer";
import ProtectedRoute from "@/routes/ProtectedRoute";
import InfoPage from "@/shared-pages/InfoPage";



import { ZA03Provider } from "@/contexts/ZA03/ZA03Provider";
import { CrudProvider } from "@/contexts/crud/CrudProvider";
import { HomeProvider } from "@/contexts/home/HomeProvider";
import { MessagesProvider } from "@/contexts/msgs/MesssagesProvider";
import { SettingsProvider } from "@/modules/settings/SettingsProvider";



import { ZA03FrameContainer } from "@/pages/jobs/ZA03/ZA03FrameContainer";
import { RenewFrameContainer } from "@/pages/auth/RenewFrameContainer";
import { MessagesFrameContainer } from "@/pages/messages/MessagesFrameContainer";
import { SettingsFrameContainer } from "@/modules/settings/SettingsFrameContainer";
import { InfiniteLoaderProvider } from "../contexts/infinite-loader/InfiniteLoaderProvider";


import CheckAuthRoute from "./CheckAuthRoute";
import authRoutes from "./authRoutes";
import labRoutes from "./labRoutes";
import aRoutes from "./aRoutes";
import bRoutes from "./bRoutes";
import cRoutes from "./cRoutes";
import dRoutes from "./dRoutes";
import eRoutes from "./eRoutes";
import hRoutes from "./hRoutes";
import pRoutes from "./pRoutes";
import uRoutes from "./uRoutes";
import fRoutes from "./fRoutes";
import hRoutes2 from "./hRoutes2";
import pRoutes2 from "./pRoutes2";
import ForbiddenPageContainer from "@/pages/ForbiddenPageContainer";
import gRoutes from "./gRoutes";

const AppRoute = () => {
	return (
		<Routes>
			{/* LANDING REDIRECTION */}
			<Route
				index
				element={
					// <Navigate to={import.meta.env.VITE_URL_LANDING} replace />
					<CheckAuthRoute />
				}
			/>

			{authRoutes}

			{labRoutes}

			{/* PROTECTED */}
			<Route path="" element={<ProtectedRoute />}>
				<Route
					path="home"
					element={
						<HomeProvider>
							<HomeContainer />
						</HomeProvider>
					}
				/>
				<Route
					path="msgs"
					element={
						<InfiniteLoaderProvider>
							<MessagesProvider>
								<MessagesFrameContainer />
							</MessagesProvider>
						</InfiniteLoaderProvider>
					}
				/>
				<Route path="renew" element={<RenewFrameContainer />} />
				<Route
					path="settings"
					element={
						<SettingsProvider>
							<SettingsFrameContainer />
						</SettingsProvider>
					}
				/>

				<Route path="modules">
					{aRoutes}
					{bRoutes}
					{cRoutes}
					{dRoutes}
					{eRoutes}
					{fRoutes}
					{gRoutes}
					{hRoutes}
					{hRoutes2}
					{pRoutes}
					{pRoutes2}
					{uRoutes}
					{/* ZA */}
					<Route
						path="ZA03"
						element={
							<CrudProvider>
								<InfiniteLoaderProvider>
									<ZA03Provider>
										<ZA03FrameContainer />
									</ZA03Provider>
								</InfiniteLoaderProvider>
							</CrudProvider>
						}
					/>
					{/* MODULE NOT FOUND */}
					<Route
						path="*"
						element={
							<InfoPage
								severity="warning"
								alertProps={
									{
										// maxWidth:
									}
								}
								title="找不到您要瀏覽的模組"
								message="請聯絡系統管理員"
							/>
						}
					/>
				</Route>
			</Route>
			<Route
				path="forbidden"
				element={
					<ForbiddenPageContainer />
				}
			/>
			{/* PUBLIC PAGE NOT FOUND */}
			<Route
				path="*"
				element={
					<InfoPage
						severity="warning"
						alertProps={
							{
								// maxWidth:
							}
						}
						title="找不到您要瀏覽的頁面"
						message="請聯絡系統管理員"
					/>
				}
			/>

		</Routes>
	);
};

export default AppRoute;
