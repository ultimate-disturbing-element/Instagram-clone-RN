import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Pressable,
  TouchableOpacity,
  Alert
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import validator from "email-validator";

import {firebase} from "../../firebase";

const LoginForm = ({navigation}) => {
  const LoginFormSchema = yup.object().shape({
    email: yup.string().email().required("An email is required"),
    password: yup
      .string()
      .required()
      .min(6, "Your password has to at least 6 characters"),
  });

  const onLogin = async (email,password) => {
    try{
      await firebase.auth().signInWithEmailAndPassword(email,password)
      console.log("Firebase login Successfull",email,password)
    } catch(error){
      Alert.alert('Error',error.message + '\n\n What would you like to do next',[
        {
          text:'OK',
          onPress:()=>console.log('OK'),
          style:'cancel'
        },{
          text:'Sign Up',
          onPress:()=>navigation.push('SignUpScreen')
        }
      ])
    }
  }
  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) =>{
          onLogin(values.email,values.password)
        }}
        validationSchema={LoginFormSchema}
        validateOnMount={true}
      >
        {({ handleBlur, handleChange, handleSubmit, values, isValid }) => (
          <>
            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    values.email.length < 1 || validator.validate(values.email)
                      ? "#ccc"
                      : "red",
                },
              ]}
            >
              <TextInput
                placeholder="Phone Number, username or email"
                placeholderTextColor="#444"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoFocus={true}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
            </View>
            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    1 > values.password.length || values.password.length >= 6
                      ? "#ccc"
                      : "red",
                },
              ]}
            >
              <TextInput
                placeholder="Password"
                placeholderTextColor="#444"
                autoCapitalize="none"
                textContentType="password"
                secureTextEntry={true}
                autoCorrect={false}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
            </View>

            <View style={{ alignItems: "flex-end", marginBottom: 30 }}>
              <Text style={{ color: "#6BB0F5" }}>Forgot Password ?</Text>
            </View>
            <Pressable
              titleSize={20}
              style={styles.button(isValid)}
              onPress={handleSubmit}
              disabled={!isValid}
            >
              <Text style={styles.buttonText}>Log In</Text>
            </Pressable>

            <View style={styles.signupContainer}>
              <Text>Don't have an Account? </Text>
              <TouchableOpacity onPress={()=>navigation.push("SignUpScreen")}>
                <Text style={{ color: "#6BB0F5" }}> Sign Up</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 80,
  },
  inputField: {
    borderRadius: 4,
    padding: 12,
    backgroundColor: "#FAFAFA",
    marginBottom: 10,
    borderWidth: 1,
  },
  button: (isValid) => ({
    backgroundColor: isValid ? "#0096F6" : "#9ACAF7",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 42,
    borderRadius: 4,
  }),
  buttonText: {
    fontWeight: "600",
    color: "#fff",
    fontSize: 20,
  },
  signupContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 50,
  },
});
