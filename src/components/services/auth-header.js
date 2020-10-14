
export default function authHeader(user) {

  if (user && user.accessToken) {
    return { Authorization: 'Bearer ' + user.accessToken }; // for Spring Boot back-end
  } else {
    return {};
  }
}