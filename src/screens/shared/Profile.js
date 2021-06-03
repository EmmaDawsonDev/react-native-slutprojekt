import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import AuthContext from "../../store/AuthContext";
import BaseContainer from "../../components/BaseComponents/BaseContainer";
import BaseCard from "../../components/BaseComponents/BaseCard";
import BaseFlexRow from "../../components/BaseComponents/BaseFlexRow";
import Icon from "react-native-vector-icons/FontAwesome5";
import Color from "../../constants/color";

//dynamiska variabler via props: iconName, Text, borderColor

const ProfileScreen = () => {
  const { signOut, user } = useContext(AuthContext);
  return (
    <BaseContainer>
      <View style={styles.circle}>
        <Icon name="user" size={60} color="white" solid />
      </View>
      <BaseFlexRow>
        <BaseCard
          iconName="user"
          text={user.name}
          borderColor={Color.blue}
          onPress={() => console.log("name")} //Lägg till handler funktion som öppnar modal och redigera name
        ></BaseCard>
        <BaseCard
          iconName="envelope"
          text={user.email}
          borderColor={Color.red}
          onPress={() => console.log("email")} //Lägg till handler funktion som öppnar modal och redigera email
        ></BaseCard>
      </BaseFlexRow>
      <BaseFlexRow>
        <BaseCard
          iconName="key"
          text="Change password"
          borderColor={Color.pink}
          onPress={() => console.log("password")} //Lägg till handler funktion som öppnar modal och redigera password
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
