import React from 'react';


const data = {
    user1 : {
        name: '유저1',
        dscp: '유저1 디테일'
    },
    user2 : {
        name: '유저2',
        dscp: '유저2 디테일'
    }
};

const Profile = ({match}) => {
    const {username} = match.params;
    const profile = data[username];
    if(!profile){
        return <div>존재하지 않는 사용자</div>
    }
    return (
        <div>
            <h3>
                {username} ({profile.name})
            </h3>
            <p>{profile.dscp}</p>
        </div>
    );
};

export default Profile;