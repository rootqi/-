var sqlMap = {
    user: {
        add: 'insert into user (userID, password, avatarUrl, nickname, age, email, introduction) values (?,?,?,?,?,?,?)',
        select_userID: 'select * from user', 
        update_user: 'update user set'
    },
    
    video: {
        add: 'insert into video (userID, videoID, videoUrl, videoTitle, videoSort, videoDesc) values (?,?,?,?,?,?)',
        select_allVideo: 'select * from video',
    },

    comment: {
        add: 'insert into comments (userID, avatarUrl, videoID, nickname, comment) values (?,?,?,?,?)',
        select_allComments: 'select * from comments',
        update_comment: 'update comments set',
    },

    userlike: {
        add: 'insert into userlike (userID, avatarUrl, nickname, videoID, videoUrl, videoTitle, videoDesc) values (?,?,?,?,?,?,?)',
        delete: 'delete from userlike',
        select_videoMyLike: 'select * from userlike',
    }
}

module.exports = sqlMap;
