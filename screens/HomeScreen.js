import React, { useEffect,useState } from "react";
import { SafeAreaView, StyleSheet, ScrollView } from "react-native";
import BottomTabs from "../components/Home/BottomTabs";
import Header from "../components/Home/Header";
import Post from "../components/Home/Post";
import Stories from "../components/Home/Stories";
import { bottomTabIcons } from "../Data/Bottom_Tab_Icons";
import { db } from "../firebase";

const HomeScreen = ({navigation}) => {
  const [posts,setPosts] = useState([])
  useEffect(()=>{
    db.collectionGroup('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(post=>({id:post.id,...post.data()})))
    })
  },[])
  return (
    <SafeAreaView style={styles.container}>
      <Header  navigation={navigation}/>
      <Stories />
      <ScrollView>
        {posts.map((post, index) => (
          <Post post={post} key={index}  />
        ))}
      </ScrollView>
      <BottomTabs icons={bottomTabIcons}/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
  },
});

export default HomeScreen;
