import { signIn } from "next-auth/react";


const SignupPage = () => {

  return (
    <main>
      <button onClick={ () => signIn("credentials", {
        email: "doe.kevin@gmail.com",
        password: "thebastion",
        userType: "staff",
        callbackUrl: "/"
       }) }>kevin</button>
       <button onClick={ () => signIn("credentials", { 
        email: "doe.natasha@gmail.com",
        password: "thebastion",
        userType: "staff",
        callbackUrl: "/"
        }) }>natasha</button>
    </main>
  )
}


export default SignupPage;