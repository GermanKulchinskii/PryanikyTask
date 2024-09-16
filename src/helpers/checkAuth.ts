// import { AppDispatch } from '../store/store';
// import { startAuth, successAuth, failAuth } from "../store/slices/authSlice";
// import AuthService from "../API/AuthService";


// export const checkUser = () => async (dispatch: AppDispatch) => {
//   dispatch(startAuth());
//   console.log("CheckUser is running.");
//     try {
//       const resp = await AuthService.checkToken();
//       console.log(resp, 1);
//       if (resp.data?.data) {
//         console.log(2);
//         dispatch(successAuth());
//       } else if(resp.data.error_text === 'Access deny') {
//         console.log( 33);
//         dispatch(failAuth());
        
//       }
//     } catch (error) {
//       dispatch(failAuth());
//       console.log(error);
//     }
// }

