import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/router";

import { statusCheck } from "../../helpers/statusCheck";
import { Layout } from "../../component/account/Layout";

export default Login;

function Login() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  async function onSubmit(data) {
    const { username, password } = data;
    fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(statusCheck)
      .then((res) => res.json())
      .then((text) => {
        console.log(text);
        router.push("/private");
      })
      .catch((err) => {
        console.log(err);
        alert(
          "Invalid username and/or password combination. Please try again!"
        );
      });
  }

  return (
    <Layout>
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
    </Layout>
  );
}
