import React,{useState,useEffect} from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Divider } from "react-native-elements";
import { firebase,db } from "../../firebase";

const postFooterIcons = [
  {
    name: "Like",
    imageUrl:
      "https://img.icons8.com/fluency-systems-regular/60/ffffff/like--v1.png",
    likedImageUrl:
      "https://www.transparentpng.com/thumb/instagram-heart/5AVRiZ-instagram-heart-background.png",
  },
  {
    name: "Comment",
    imageUrl: "https://img.icons8.com/material-outlined/60/ffffff/speech.png",
    likedImageUrl:
      "https://www.transparentpng.com/thumb/instagram-heart/5AVRiZ-instagram-heart-background.png",
  },
  {
    name: "Share",
    imageUrl:
      "https://img.icons8.com/material-outlined/60/ffffff/paper-plane.png",
    likedImageUrl:
      "https://www.transparentpng.com/thumb/instagram-heart/5AVRiZ-instagram-heart-background.png",
  },
  {
    name: "Save",
    imageUrl:
      "https://img.icons8.com/material-outlined/60/ffffff/bookmark-ribbon.png",
    likedImageUrl:
      "https://www.transparentpng.com/thumb/instagram-heart/5AVRiZ-instagram-heart-background.png",
  },
];

const Post = ({ post }) => {
  const handleLike = (post) => {
    const currentLikeStatus = !post.likes_by_users.includes(
      firebase.auth().currentUser.email
    );
    db.collection("users")
      .doc(post.owner_email)
      .collection("posts")
      .doc(post_id)
      .update({
        likes_by_users: currentLikeStatus
          ? firebase.firestore.FieldValue.arrayUnion(
              firebase.auth().currentUser.email
            )
          : firebase.firestore.FieldValue.arrayRemove(
              firebase.auth().currentUser.email
            ),
      }).then(()=>{
        console.log( 'Document Successfully updated')
      })
      .catch(error => {
        console.error('Error Updating document:',error)
      })
  };
  return (
    <View style={{ marginBottom: 30 }}>
      <Divider width={1} orientation="vertical" />
      <PostHeader post={post} />

      <PostImage post={post} />
      <View style={{ marginHorizontal: 15, marginTop: 10 }}>
        <PostFooter post={post} handleLike={handleLike} />
        <Likes post={post} />
        <Caption post={post} />
        <CommentSection post={post} />
        <Comments post={post} />
      </View>
    </View>
  );
};

const PostHeader = ({ post }) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      margin: 5,
      alignItems: "center",
    }}
  >
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Image
        source={{
          uri: post.profile_picture,
        }}
        style={styles.story}
      />
      <Text style={{ color: "white", marginLeft: 5, fontWeight: "700" }}>
        {post.user}
      </Text>
    </View>

    <Text style={{ color: "white", fontWeight: "900" }}>...</Text>
  </View>
);

const PostImage = ({ post }) => (
  <View style={{ width: "100%", height: 450 }}>
    <Image
      source={{ uri: post.imageUrl }}
      style={{ height: "100%", resizeMode: "cover" }}
    />
  </View>
);

const PostFooter = ({ handleLike, post }) => (
  <View style={{ flexDirection: "row" }}>
    <View style={styles.leftFooterIconsContainer}>
      <TouchableOpacity onPress={()=>handleLike(post)}>
    <Image style={styles.footerIcon} source={{uri:postFooterIcons[0].imageUrl}}/>
    </TouchableOpacity>
      <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[1].imageUrl} />
      <Icon
        imgStyle={[styles.footerIcon, styles.shareIcon]}
        imgUrl={postFooterIcons[2].imageUrl}
      />
    </View>
    <View style={{ flex: 1, alignItems: "flex-end" }}>
      <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[3].imageUrl} />
    </View>
  </View>
);
const Icon = ({ imgStyle, imgUrl }) => (
  <TouchableOpacity>
    <Image style={imgStyle} source={{ uri: imgUrl }} />
  </TouchableOpacity>
);

const Likes = ({ post }) => (
  <View style={{ flexDirection: "row", marginTop: 4 }}>
    <Text style={{ color: "white", fontWeight: "600" }}>
      {post.likes_by_users.length.toLocaleString("en")} likes
    </Text>
  </View>
);

const Caption = ({ post }) => (
  <View style={{ marginTop: 5 }}>
    <Text style={{ color: "white" }}>
      <Text style={{ fontWeight: "600" }}>{post.user} </Text>
      <Text>{post.caption}</Text>
    </Text>
  </View>
);

const CommentSection = ({ post }) => (
  <View style={{ marginTop: 5 }}>
    {!!post.comments.length && (
      <Text style={{ color: "grey" }}>
        View{post.comments.length > 1 ? " all " : " "}
        {post.comments.length}{" "}
        {post.comments.length > 1 ? "Comments" : "comment"}
      </Text>
    )}
  </View>
);

const Comments = ({ post }) => (
  <>
    {post.comments.map((comment, index) => (
      <View key={index} style={{ flexDirection: "row", marginTop: 5 }}>
        <Text style={{ color: "white" }}>
          <Text style={{ fontWeight: "600" }}>{comment.user}</Text>{" "}
          {comment.comment}
        </Text>
      </View>
    ))}
  </>
);

export default Post;

const styles = StyleSheet.create({
  story: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginLeft: 6,
    borderWidth: 1.6,
    borderColor: "#ff8501",
  },
  footerIcon: {
    width: 33,
    height: 33,
  },
  leftFooterIconsContainer: {
    width: "32%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  shareIcon: {
    transform: [{ rotate: "405deg" }],
  },
});
