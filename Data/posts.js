import { USERS } from "./users";

export const POSTS = [
    {
        imageUrl:'https://i.ibb.co/182bP1y/4k.png',
        user:USERS[0].user,
        likes:7870,
        caption:'Train Ride to Hogwarts',
        profile_picture:USERS[0].image,
        comments:[
            {
                user:'theqazman',
                comment:'WOW! This build looks fire.'
            },{
                user:'amaanth.dev',
                comment:"Once I wake Up,I'll finally be ready to code this up!"
            },
        ]
    },
    
]