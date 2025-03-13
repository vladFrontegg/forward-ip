import { GetServerSideProps } from 'next';
import { getSession } from '@frontegg/nextjs/pages'; //,, withSSRSession useAuth 
import { useAuth, useLoginWithRedirect } from '@frontegg/nextjs'; //, useLoginWithRedirect
import { AdminPortal } from '@frontegg/nextjs'
import {useRouter} from 'next/router';  
import { useAuthActions } from '@frontegg/react-hooks';
import { useCallback, useEffect } from "react";
import {
  useFeatureEntitlements,
  usePermissionEntitlements,
  useEntitlements,
  useIsAuthenticated,
} from "@frontegg/nextjs";

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

  const checkHeader = async () => {
    

    const response = await fetch("/api/header", {
      method: "GET",
    });
console.log(response.json())
    return response.json();
  };

  const { loadEntitlements } = useAuthActions();
  const onLoadEntitlements = () => { loadEntitlements({callback: (isSucceeded) =>
            console.log(`request ${isSucceeded ? "succeeded" : "failed"}`),
    });
};

useEffect(() => {
  checkHeader()
  console.log('useEffect fix GitHub');
},[])

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
          <Entitlements/>
     <button onClick={() => {loadEntitlements();}}> Load entitlements </button>;
     <button onClick={onLoadEntitlements}>Load entitlements with callback</button>;
    </div>
      
  );
}

const Entitlements = () => {
  const { isEntitled: isAEntitled, justification: justificationA } = useFeatureEntitlements('feature_a') //, {date: new Date(Date.UTC(2023,10,18)), number: -4})
  const { isEntitled: isXEntitled, justification: justificationX } = useFeatureEntitlements('feature_x')
  const { isEntitled: isYEntitled, justification: justificationY } = useFeatureEntitlements('feature_y');

  const { isEntitled: isXreadEntitled, justification: justificationXread } = usePermissionEntitlements('fe.x.read');
  const { isEntitled: isXwriteEntitled, justification: justificationXwrite } = usePermissionEntitlements('fe.x.write');
  const { isEntitled: isYreadEntitled, justification: justificationYread } = usePermissionEntitlements('fe.y.read');
  const { isEntitled: isYwriteEntitled, justification: justificationYwtire } = usePermissionEntitlements('fe.y.write');
  const { isEntitled: isXcopyEntitled, justification: justificationXcopy} = usePermissionEntitlements('fe.x.copy');


  // const { isEntitled: isXReadEntitled, justification: justificationXRead } = useEntitlements({ featureKey: 'fe.x.read' });
  // const { isEntitled: isXWriteEntitled, justification: justificationXWrite } = useEntitlements({ featureKey: 'fe.x.write' });
  // const { isEntitled: isYReadEntitled, justification: justificationYRead } = useEntitlements({ featureKey: 'fe.y.read' });
  // const { isEntitled: isYWriteEntitled, justification: justificationYWrite } = useEntitlements({ featureKey: 'fe.y.write' });
  // const { isEntitled: isXCopyEntitled, justification: justificationXCopy } = useEntitlements({ featureKey: 'fe.x.copy' });

  // const { isEntitled: isAFeatureEntitled, justification: justificationAfeature } = useEntitlements({ featureKey: 'feature_a' });
  // const { isEntitled: isXFeatureEntitled, justification: justificationXfeature } = useEntitlements({ featureKey: 'feature_x'});
  // const { isEntitled: isYFeatureEntitled, justification: justificationYfeature } = useEntitlements({ featureKey: 'feature_y' });
  
  
  return (
    <>
    <div>A: {isAEntitled ? 'on' : 'off'} / {justificationA}</div>
    <div>X: {isXEntitled ? 'on' : 'off'} / {justificationX}</div>
    <div>Y: {isYEntitled ? 'on' : 'off'} / {justificationY}</div>

     <div>fe.x.read: {isXreadEntitled ? 'on' : 'off'} / {justificationXread}</div>
    <div>fe.x.write: {isXwriteEntitled ? 'on' : 'off'} / {justificationXwrite}</div>
    <div>fe.y.read: {isYreadEntitled ? 'on' : 'off'} / {justificationYread}</div>
    <div>fe.y.write: {isYwriteEntitled ? 'on' : 'off'} / {justificationYwtire}</div>
    <div>fe.x.copy: {isXcopyEntitled ? 'on' : 'off'} / {justificationXcopy}</div>


    {/* <div>fe.x.read: {isXReadEntitled ? 'on' : 'off'} / {justificationXRead}</div>
    <div>fe.x.write: {isXWriteEntitled ? 'on' : 'off'} / {justificationXWrite}</div>
    <div>fe.y.read: {isYReadEntitled ? 'on' : 'off'} / {justificationYRead}</div>
    <div>fe.y.write: {isYWriteEntitled ? 'on' : 'off'} / {justificationYWrite}</div>
    <div>fe.x.copy: {isXCopyEntitled ? 'on' : 'off'} / {justificationXCopy}</div> */}
{/* 
    <div>feature_a: {isAFeatureEntitled ? 'on' : 'off'} / {justificationAfeature}</div>
    <div>feature_x: {isXFeatureEntitled ? 'on' : 'off'} / {justificationXfeature}</div>
    <div>feature_y: {isYFeatureEntitled ? 'on' : 'off'} / {justificationYfeature}</div> */}
 </>
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


