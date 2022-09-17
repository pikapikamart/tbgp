import { signIn } from "next-auth/react";


const SignupPage = () => {

  return (
    <main>
      <button onClick={ () => signIn(undefined, { callbackUrl: "/" }) }>login</button>
    </main>
  )
}


export default SignupPage;