import React, { useState,useEffect } from "react";
import { StyleSheet, Image, TextInput, View,Text } from "react-native";
import * as yup from "yup";
import { Formik, FormikProvider } from "formik";
import { Divider } from "react-native-elements/dist/divider/Divider";
import { Button } from "react-native-elements/dist/buttons/Button";
import { NavigationContainer } from "@react-navigation/native";
import validUrl from  'valid-url'
import {firebase,db} from '../../firebase';

const PLACEHOLDER_IMG =
  "https://www.brownweinraub.com/wp-content/uploads/2017/09/placeholder.jpg";

const uploadPostSchema = yup.object().shape({
  imageUrl: yup.string().url().required("A URL is required"),
  caption: yup.string().max(2200, "Caption Has Reached the Character limit"),
});

const FormikPostUploader = ({navigation}) => {
  const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMG);
  const [currentLoggedInUser,setCurentLoggedInUser] = useState(null)

  const getUserName = () =>{
    const user = firebase.auth().currentUser
    const unSubscribe = db.collection('users').where('owner_uid','==',user.uid).limit(1).onSnapshot(snapshot => snapshot.docs.map(doc=>{
      setCurentLoggedInUser({
        username :doc.data().username,
        profilePicture:doc.data().profile_picture

      })
    }))
    return unSubscribe
  }
  useEffect(()=>{
    getUserName()
  },[])

  const uploadPostToFire = (imageUrl,caption) => {
    const unSubscribe = db.collection('users').doc(firebase.auth().currentUser.email).collection('posts').add({
      imageUrl:imageUrl,
      user:currentLoggedInUser.username,
      profile_picture:currentLoggedInUser.profilePicture,
      owner_uid:firebase.auth().currentUser.uid,
      owner_email:firebase.auth().currentUser.email,
      caption:caption,
      createAt:firebase.firestore.FieldValue.serverTimestamp(),
      likes_by_users:[],
      comments:[],
    })
    .then(()=>navigation.goBack())
    
    return unSubscribe
  }
  return (
    <Formik
      initialValues={{ caption: "", imageUrl: "" }}
      onSubmit={(values) => {
        uploadPostToFire(values.imageUrl,values.caption)
        }}
      validationSchema={uploadPostSchema}
      validateOnMount={true}
    >
      {({
        handleBlur,
        handleChange,
        handleSubmit,
        values,
        errors,
        isValid,
      }) => (
        <>
          <View style={{margin:20,justifyContent:"space-between",flexDirection:'row'}}>
            <Image
              source={{ uri:validUrl.isUri( thumbnailUrl) ? thumbnailUrl : PLACEHOLDER_IMG }}
              style={{ width: 100, height: 100 }}
            />
            <View style={{flex:1,marginLeft:12}}>

            <TextInput
              placeholder="Write a caption..."
              placeholderTextColor="grey"
              multiline={true}
              style={{ color: "white",fontSize:20 }}
              onChangeText={handleChange('caption')}
              onBlur={handleBlur('caption')}
              value={values.caption}
            />
           </View>
          </View>
          <Divider width={0.2} orientation='vertical'/>
          <TextInput
          onChange={(e)=>setThumbnailUrl(e.nativeEvent.text)}
              style={{ color: "white" }}
              placeholder="Enter Image Url"
              placeholderTextColor="grey"
              onChangeText={handleChange('imageUrl')}
              onBlur={handleBlur("imageUrl")}
              value={values.imageUrl}
            />
            {
                errors.imageUrl && (
                    <Text style={{fontSize:10,color:'red'}}>{errors.imageUrl}</Text>
                )
            }
            <Button onPress={handleSubmit} title='Share' disabled={!isValid} />
        </>
      )}
    </Formik>
  );
};

export default FormikPostUploader;

const styles = StyleSheet.create({});
