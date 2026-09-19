import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/Common/NavBar";
import ForgotPassword from "./pages/ForgotPassword";
import SignupPaga from "./components/Common/signupPaga";
import LoginPaga from "./components/Common/loginPaga";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./components/Common/about";
import Contact from "./components/Common/Contact";
import MyProfile from "./components/Core/dashboard/MyProfile";
import Dashboard from "./components/Common/Dashboard";
import PrivateRoute from "./components/Core/Auth/PrivateRoute";
import Error from "./pages/Error";
import EnrolledCourses from "./components/Core/dashboard/EnrolledCourses";
import ChangeSetting from "./components/Core/dashboard/setting/ChangeSetting";
import Cart from "./components/Core/dashboard/Cart/index";
import { ACCOUNT_TYPE } from "./utils/constants";
import IstructorCart from "./components/Core/instructorDashB/index";
import { useSelector } from "react-redux";
import AddCourse from "./components/Core/instructorDashB/AddCourse";
import EditCourse from "./components/Core/instructorDashB/EditCourse";
import Catelog from "./pages/Catelog";
import CourseDetails from "./pages/CourseDetails";
import ViewCourse from "./pages/viewCourse";
import VideoDetails from "./components/Core/ViewCourse/VideoDetails";
import Instructor from "./components/Core/dashboard/instructorDashboard/Instructor";
function App() {
  const { user } = useSelector((state) => state.profile);

  return (
    <div className="w-screen min-h-screen bg-richblack-900  flex flex-col font-inter">
      <NavBar />
      <Routes>
        <Route path="/catalog/:catalogName" element={<Catelog />} />
        <Route path="/course/:courseId" element={<CourseDetails />} />
        <Route path="/signup" element={<SignupPaga />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPaga />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/update-password/:id" element={<UpdatePassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route element={
          <PrivateRoute>
            <ViewCourse />
          </PrivateRoute>
        }>
          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route
                  path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"

                  element={<VideoDetails />}
                />
              </>
            )
          }

        </Route>


        <Route element={<PrivateRoute><Dashboard /></PrivateRoute>}>
          <Route path="/dashboard/myprofile" element={<MyProfile />} />

          <Route path="/dashboard/settings" element={<ChangeSetting />} />

          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses />} />
                <Route path="/dashboard/cart" element={<Cart />} />
              </>
            )
          }


          {
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                <Route path="/dashboard/instructor" element={<Instructor />} />
                <Route path="/dashboard/my-courses" element={<IstructorCart />} />
                <Route path="/dashboard/add-course" element={<AddCourse />} />
                <Route path="/dashboard/edit-course/:courseId" element={<EditCourse />} />
              </>
            )
          }



        </Route>
        <Route path="*" element={<Error />} />

      </Routes>
    </div>
  );
}

export default App;
