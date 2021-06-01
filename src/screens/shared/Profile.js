import React, {useContext} from "react";
import { SafeAreaView, Text, Button } from 'react-native'
import AuthContext from "../../store/AuthContext";

const ProfileScreen = () => {
  const { signOut, user } = useContext(AuthContext);
  return (
    <SafeAreaView>
      <Text>Name: {user.name}</Text>
      <Text>Email: {user.email}</Text>
      <Button
        onPress={() => {
          signOut();
        }}
        title="sign out"
      />
    </SafeAreaView>
  );
};

export default ProfileScreen;
