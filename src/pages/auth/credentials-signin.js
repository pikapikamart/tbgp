import { Auth } from "../../client/components/auth";
import { getCsrfToken } from "next-auth/react";


const CredentialsSignin = ({ csrfToken }) => {

  return (
    <Auth csrfToken={ csrfToken } />
  )
};


export async function getServerSideProps(context) {

  return {
    props: {
      csrfToken: await getCsrfToken(context)
    }
  }
}


export default CredentialsSignin;