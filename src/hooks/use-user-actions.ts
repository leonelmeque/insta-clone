import { followUser, isFollowing, unFollowUser } from "library/backend";
import { useEffect, useState } from "react";

export const useUserActions = (uid: string) => {
  const [follows, setFollows] = useState<boolean | null>(false);

  const fetchFollowStatus = async () => {
    const result = await isFollowing(uid);
    console.log('from result ', result)
    setFollows(result);
  };


  const _followUser = () => {
    followUser(uid).then(() => {
      setFollows(!follows);
    });
  }

  const unfollowUser = () => {
    unFollowUser(uid).then(() => {
      setFollows(!follows);
    });
  };

  // send a message
  //send email

  useEffect(() => {
    if (!follows) fetchFollowStatus();
    return;
  }, []);

  return {
    followUser: _followUser,
    unfollowUser,
    follows
  }
}