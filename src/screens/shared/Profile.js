import React, { useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import AuthContext from "../../store/AuthContext";
import BaseContainer from "../../components/BaseComponents/BaseContainer";
import BaseCard from "../../components/BaseComponents/BaseCard";
import BaseFlexRow from "../../components/BaseComponents/BaseFlexRow";
import Icon from "react-native-vector-icons/FontAwesome5";
import Color from "../../constants/color";
import ChangeCredentialsModal from "../../components/Modals/ChangeCredentialsModal";
import ChangePasswordModal from "../../components/Modals/ChangePasswordModal";

//dynamiska variabler via props: iconName, Text, borderColor

const ProfileScreen = () => {
  const { signOut, user } = useContext(AuthContext);
  const [credential, setCredential] = useState("");
  const [credentialsModalVisible, setCredentialsModalVisible] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);

  const handleChangeUserName = () => {
    setCredential("name");
    setCredentialsModalVisible(true);
  };
  const handleChangeUserEmail = () => {
    setCredential("email");
    setCredentialsModalVisible(true);
  };

  const handleChangeUserPassword = () => {
    setPasswordModalVisible(true);
  };

  return (
    <BaseContainer>
      <ChangeCredentialsModal
        modalVisible={credentialsModalVisible}
        setModalVisible={setCredentialsModalVisible}
        credential={credential}
        user={user}
      />

      <ChangePasswordModal
        modalVisible={passwordModalVisible}
        setModalVisible={setPasswordModalVisible}
        user={user}
      />
      <View style={styles.circle}>
        <Icon name="user" size={60} color="white" solid />
      </View>
      <BaseFlexRow>
        <BaseCard
          iconName="user"
          text={user.name}
          borderColor={Color.blue}
          onPress={handleChangeUserName} //Lägg till handler funktion som öppnar modal och redigera name
        ></BaseCard>
        <BaseCard
          iconName="envelope"
          text={user.email}
          borderColor={Color.red}
          onPress={handleChangeUserEmail} //Lägg till handler funktion som öppnar modal och redigera email
        ></BaseCard>
      </BaseFlexRow>
      <BaseFlexRow>
        <BaseCard
          iconName="key"
          text="Change password"
          borderColor={Color.pink}
          onPress={handleChangeUserPassword} //Lägg till handler funktion som öppnar modal och redigera password
        ></BaseCard>
        <BaseCard
          iconName="sign-out-alt"
          text="Sign out"
          borderColor={Color.orange}
          onPress={() => {
            signOut();
          }}
        ></BaseCard>
      </BaseFlexRow>
    </BaseContainer>
  );
};

const styles = StyleSheet.create({
  circle: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.secondaryDark,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 5,
    borderRadius: 100,
    height: 100,
    width: 100,
    alignSelf: "center",
    marginBottom: 30,
  },
});

export default ProfileScreen;
