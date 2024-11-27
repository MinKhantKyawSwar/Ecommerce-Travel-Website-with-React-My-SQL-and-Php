import { redirect } from "react-router-dom";

const isLogin = async () => {
  const token = JSON.parse(localStorage.getItem("token"));
  // console.log(token)

  if (!token) {
    return redirect("/");
  }

  const response = await axios.get("http://localhost:3000/backend/login.php", {
    headers: {
      Authorization: `Bearer ${token.token}`,
    },
  });

  if (response.status === 401) {
    localStorage.setItem("token", null);
    window.location.reload(false);
    return redirect("/");
  } else {
    return null;
  }
};

export default isLogin;