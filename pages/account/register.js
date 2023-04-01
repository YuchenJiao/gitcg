import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/router";

import { statusCheck } from "@/helpers/statusCheck";
import { Layout } from "@/components/account/Layout";

export default Register;

function Register() {
  const { register, handleSubmit, formState } = useForm({
    mode: "onBlur",
  });
  const { errors } = formState;
  const router = useRouter();

  async function onSubmit(data) {
    const { username, password } = data;
    fetch("/api/register", {
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
        alert("Register succeed");
        setTimeout(() => {
          router.push("/");
        }, 1500);
      })
      .catch((err) => {
        const errorMessage = JSON.parse(err.toString().substring(7));
        switch (errorMessage.response.code) {
          case 409:
            alert("Username already exists. Please try something else.");
            break;
          default:
            alert(
              "Something went wrong on the server. Please try again later."
            );
        }
        console.log(errorMessage.response.data.msg);
      });
  }

  // The password is at least 8 characters long (?=.{8,})
  // The password has at least one uppercase letter (?=.*[A-Z])
  // The password has at least one lowercase letter (?=.*[a-z])
  // The password has at least one digit (?=.*[0-9])
  // The password has at least one special character ([^A-Za-z0-9])
  const strongPwdChecker = new RegExp(
    "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
  );

  return (
    <Layout>
      <div className="card">
        <h1 className="card-header">Register</h1>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                {...register("username", {
                  required: true,
                  validate: (input) => {
                    // fetch api to find if input exists
                  },
                  minLength: 6,
                  maxLength: 20,
                })}
                placeholder="Username"
                type="text"
                className="form-control"
              />
              <ul className="text-danger">
                {errors.username && (
                  <>
                    <li>
                      <div>
                        {errors.username &&
                          "Username should be at least 6 characters long"}
                      </div>
                    </li>
                  </>
                )}
              </ul>
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                {...register("password", {
                  required: true,
                  validate: (input) => strongPwdChecker.test(input),
                  maxLength: 20,
                })}
                placeholder="Password"
                name="password"
                type="password"
                className="form-control"
              />
              <ul className="text-danger">
                {errors.password && (
                  <>
                    <li>
                      <div>
                        {errors.password &&
                          "The password should be at least 8 characters long"}
                      </div>
                    </li>
                    <li>
                      <div>
                        {errors.password &&
                          "The password should have at least one uppercase letter"}
                      </div>
                    </li>
                    <li>
                      <div>
                        {errors.password &&
                          "The password should have at least one lowercase letter"}
                      </div>
                    </li>
                    <li>
                      <div>
                        {errors.password &&
                          "The password should have at least one digit"}
                      </div>
                    </li>
                    <li>
                      <div>
                        {errors.password &&
                          "The password should have at least one special character"}
                      </div>
                    </li>
                  </>
                )}
              </ul>
            </div>
            <button type="submit" className="btn btn-primary">
              Register
            </button>
            <Link href="/account/login" className="btn btn-link">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </Layout>
  );
}
