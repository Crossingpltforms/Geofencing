import React, { useEffect, useState } from 'react';
import { Button, Linking, Text, View } from 'react-native';
import Amplify, { Auth, Hub } from 'aws-amplify';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import awsconfig from '../aws-exports';
import { SignedOutMessage } from 'aws-amplify-react-native/dist/AmplifyUI';

async function urlOpener(url, redirectUrl) {
  await InAppBrowser.isAvailable();
  const { type, url: newUrl } = await InAppBrowser.openAuth(url, redirectUrl, {
    showTitle: false,
    enableUrlBarHiding: true,
    enableDefaultShare: false,
    ephemeralWebSession: false,
  });

  if (type === 'success') {
    Linking.openURL(newUrl);
  }
}

Amplify.configure({
  ...awsconfig,
  oauth: {
    ...awsconfig.oauth,
    urlOpener,
  },
});

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      console.log("event",event)
      switch (event) {
        case 'signIn':
        case 'cognitoHostedUI':
          getUser().then(userData => setUser(userData));
          break;
        case 'signOut':
          
          setUser(null);
          break;
        case 'signIn_failure':
        case 'cognitoHostedUI_failure':
          console.log('Sign in failure', data);
          break;
      }
    });

    getUser().then(userData => setUser(userData));
  }, []);

  function getUser() {
    return Auth.currentAuthenticatedUser()
      .then(userData => userData)
      .catch(() => console.log('Not signed in'));
  }

  async function SignedOut(){
    console.log("SignedOut")
    const cognitodomain="contributortoolkit9f8b3538-9f8b3538-local.auth.us-west-2.amazoncognito.com";
    const clientId = "7j6pn6pfvt3f2ild1pu2gc69al"
    const signoutUrl = "contributortoolkit://";
     fetch('https://' + cognitodomain + '/logout?client_id=' + clientId + '&logout_uri=' + signoutUrl)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
    })
    .catch((error) => {
      console.error(error);
    });
  }

  return (
    <View style={{flex:1, justifyContent:'center'}}>
      <Text>User: {user ? JSON.stringify(user.attributes) : 'None'}</Text>
      {user ? (
        <Button title="Sign Out" onPress={() =>  Auth.signOut()} />
      ) : (
        <Button title="Federated Sign In" onPress={() => Auth.federatedSignIn({provider:'LoginWithAmazon'})} />
      )}
    </View>
  );
}

export default App;