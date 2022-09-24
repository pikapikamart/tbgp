import { signIn } from "next-auth/react";


const SignupPage = () => {

  return (
    <main>
      <button onClick={ () => signIn("credentials", {
        email: "doe.kevin@gmail.com",
        password: "thebastion",
        callbackUrl: "/"
       }) }>login</button>
       <button onClick={ () => signIn("credentials", { 
        email: "doe.jane@gmail.com",
        password: "thebastion",
        userType: "staff",
        callbackUrl: "/"
        }) }>here</button>
    </main>
  )
}


export default SignupPage;