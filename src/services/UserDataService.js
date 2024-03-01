import http from "../http-common";

class UserDataService {
  createUser(userData) {
    return http.post(`/auth/register`, userData);
  }
  getAllUsers() {
    return http.get("/admin/userlist",{
      headers: {
        'x-access-token':  sessionStorage.getItem("authToken")
      }
    });
  }
  deleteUser(userId) {
    return http.delete(`/admin/deleteuser/${userId}`, {
      headers: {
        'x-access-token': sessionStorage.getItem("authToken")
      }
    });
  }
}
export default new UserDataService();