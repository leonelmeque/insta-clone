export type LandingScreenNavigationParams = {
    'landing/register': undefined;
    'landing/login': undefined;
}

export type StackParamsList = {
    'global/uploadImage': { image: string };
    'explorer/explore': undefined;
    'tabs/profile': { uid: string }
    'explorer/profile': { uid: string, profile?: string }
    'landing/home': {}
}