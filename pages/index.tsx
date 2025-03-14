import { GetServerSideProps } from 'next';
import { getSession } from '@frontegg/nextjs/pages'; //,, withSSRSession useAuth 
import { useAuth, useLoginWithRedirect } from '@frontegg/nextjs'; //, useLoginWithRedirect
import { AdminPortal } from '@frontegg/nextjs'
import {useRouter} from 'next/router';  
import { useAuthActions } from '@frontegg/react-hooks';
import { useCallback, useEffect } from "react";

export default function ExamplePage({  }) {
  const {user} = useAuth();
  const router = useRouter();
  const loginWithRedirect = useLoginWithRedirect();
  // const { logout: logoutHosted } = useAuthActions();
  

  //baseUrl should be your FRONTEGG_APP_URL from .env.local
  const baseUrl =  'http://localhost:3000'
  
  const logout = useCallback(() => {
    router.replace('/account/logout');
  }, [router]);

  const {switchTenant} = useAuthActions();

const handleClick = () => {
    AdminPortal.show();
  };

  const handleTenantSwitch = () => {
    switchTenant({tenantId: "7a11f8f9-effd-4a17-9884-0b7f593d622d"}); //hint

    // switchTenant({tenantId: "d31c68e6-775c-4ad4-a59b-f918e4e051a3"}); //checki
    
  };

  return (
    <div>
      <h1>My Page</h1>
       {}
      <div>
        {/* @ts-ignore */}
        <img src={user?.profilePictureUrl} alt={user?.name}/>
      </div>
      <div>
        <span>Logged in as: {user?.name}</span>
      </div>
            {/* <div>
        <button onClick={logout}>Log out</button>
      </div> */}
      <div>
        <button onClick={logout}>Log out</button>
      </div>
       <div>
          <button onClick={handleClick}>Settings</button>
          </div>
          <div>
          <button onClick={handleTenantSwitch}>SwitchTenant</button>
          </div>
          <div>
          <button onClick={() => loginWithRedirect()}>Go to hosted login</button>
          </div>
    </div>
      
  );
}

// In the `getServerSideProps` method you can get data from an external service to pull relevant data for a logged in user.
// we used the prop `products`. See the commented code for an example.

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context.req);
//     const { data } = await fetch('{external}/product', {
//      headers: {
//        Authorization: 'bearer ' + session.accessToken,
//      },
//    });
if (session) {
    // logged user
    return { props: { } };
  }
  // unauthorized user
  return { props: { } };
};


