export type LandingScreenNavigationParams = {
    Register: undefined;
    Landing: undefined;
}

export type StackParamsList = {
    UploadImage: { image: string };
    Explore: undefined;
    Profile: { uid: string }
    'Explore/Profile': { uid: string, profile?:string }
    Landing:undefined
}