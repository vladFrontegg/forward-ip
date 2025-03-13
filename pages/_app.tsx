import { withFronteggApp } from '@frontegg/nextjs/pages';
import { AppProps } from 'next/app';

function CustomApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default withFronteggApp(CustomApp, 
  {
    hostedLoginBox: false, 
    //@ts-ignore
    contextOptions: {
      tenantResolver: () => {
        // const headers = [];
        const params = new URLSearchParams(window.location.search);
        const organization = params.get("organization");
        // if (organization) {
        //   headers.push({ key: "frontegg-login-alias", value: organization });
        // }
        return {tenant: organization};
      },
    },
    authOptions: {
     keepSessionAlive: false // Uncomment this in order to maintain the session alive
    },
    entitlementsOptions: { enabled: true },
    // metadata: {
    //   navigation: {
    //     allAccounts: {
    //       visibility: 'always'
    //     },
    //   }
    // }
});