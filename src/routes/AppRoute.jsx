import { Navigate, Route, Routes } from "react-router-dom";

import A02Provider from "@/contexts/a02/A02Provider";
import { CrudProvider } from "@/contexts/crud/CrudProvider";
import { ProdsProvider } from "@/contexts/prods/ProdsProvider";
import { PurchaseProvider } from "@/contexts/purchase/PurchaseProvider";
import MockC04Page from "@/mock-pages/MockC04Page";
import HomeContainer from "@/pages/home/HomeContainer";
import ProtectedRoute from "@/routes/ProtectedRoute";
import SignInRoute from "@/routes/SignInRoute";
import { LoadingFrame } from "@/shared-components/protected-page/LoadingFrame";
import InfoPage from "@/shared-pages/InfoPage";
import MockA01FrameContainer from "@/mock-pages/MockA01FrameContainer";
import { A02FrameContainer } from "@/pages/a02/A02FrameContainer";
import { DSGProvider } from "@/shared-contexts/datasheet-grid/DSGProvider";
import SignIn from "@/pages/signin/SignIn";
import SignInX from "@/pages/signin/SignInX";
import A04Provider from "../contexts/a04/A04Provider";
import { A04FrameContainer } from "../pages/a04/A04FrameContainer";
import A26Provider from "../contexts/a26/A26Provider";
import { A26FrameContainer } from "../pages/a26/A26FrameContainer";

const AppRoute = () => {
	return (
		<Routes>
			{/* Sign In */}
			<Route path="auth" element={<SignInRoute />}>
				<Route index path="signin" element={<SignIn />} />
				<Route path="signinx" element={<SignInX />} />
			</Route>
			{/* Lab */}
			<Route path="lab">
				<Route path="loading" element={<LoadingFrame />} />
			</Route>
			{/* LADING REDIRECTION */}
			<Route
				path="/"
				element={
					<Navigate to={import.meta.env.VITE_URL_LANDING} replace />
				}
			/>
			{/* PROTECTED */}
			<Route path="" element={<ProtectedRoute />}>
				<Route index path="home" element={<HomeContainer />} />

				<Route path="modules">
					<Route
						path="A01"
						element={
							<CrudProvider>
								<ProdsProvider>
									<MockA01FrameContainer />
								</ProdsProvider>
							</CrudProvider>
						}
					/>
					{/* A02 */}
					<Route
						path="A02"
						element={
							<DSGProvider
								keyColumn="CodeID"
								otherColumns="CodeData">
								<A02Provider>
									<A02FrameContainer />
								</A02Provider>
							</DSGProvider>
						}
					/>
					<Route
						path="A04"
						element={
							<DSGProvider
								keyColumn="CodeID"
								otherColumns="CodeData">
								<A04Provider>
									<A04FrameContainer />
								</A04Provider>
							</DSGProvider>
						}
					/>
					<Route
						path="A26"
						element={
							<DSGProvider
								keyColumn="CodeID"
								otherColumns="CodeData,Other1">
								<A26Provider>
									<A26FrameContainer />
								</A26Provider>
							</DSGProvider>
						}
					/>
					<Route
						path="C04"
						element={
							<CrudProvider>
								<PurchaseProvider>
									<MockC04Page />
								</PurchaseProvider>
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
								title="找不到您要瀏覽的頁面"
								message="請聯絡系統管理員"
							/>
						}
					/>
				</Route>
			</Route>

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
