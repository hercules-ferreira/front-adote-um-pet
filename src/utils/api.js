import axios from "axios";

// // comunicação com  a api
// export default axios.create({
//   baseURL: "http://localhost:5000",
// });

// class ApiUsers {
//   constructor(baseURL) {
//     this.apiUsers = axios.create({
//       baseURL,
//     });
//   }
// }
// const apiUsers = new ApiUsers(process.env.REACT_APP_API_URL);

// export default apiUsers;
//

//
// comunicação com  a api
export default axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});
