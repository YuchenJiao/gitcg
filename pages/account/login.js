import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "@/axios/custom";

export default Login;

function Login() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  async function onSubmit(data) {
    const { username, password } = data;
    try {
      const resp = await axios.post("/login", {
        username: username,
        password: password,
      });
      console.log(resp.data.msg);
      router.push("/");
    } catch (error) {
      console.log(error);
      switch (error.response.status) {
        case 401:
          console.log(error.response.data.msg);
          alert("Invalid username and/or password combination. Please try again!");
          break;
        default:
          alert("Something went wrong on the server. Please try again later.");
      }
    }
  }

  return (
    <div className="card">
      <h1 className="card-header">Login</h1>
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              {...register("username", {
                required: true,
              })}
              placeholder="Username"
              type="text"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              {...register("password", {
                required: true,
              })}
              placeholder="Password"
              name="password"
              type="password"
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
          <Link href="/account/register" className="btn btn-link">
            Register
          </Link>
        </form>
      </div>
    </div>
  );
}
