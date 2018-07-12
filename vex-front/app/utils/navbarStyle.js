
import * as colors from './colors';

export const navigatorStyle = (userState) => ({
	navBarTextColor : '#fff',
	navBarButtonColor : '#fff',
	navBarBackgroundColor: userState === 'buyer' ? colors.midBlue : colors.midGreen,
	statusBarColor : userState === 'buyer' ? colors.midBlue : colors.midGreen,
	topBarElevationShadowEnabled: true
})

export const accountNavbarStyle = {
	navBarTransparent: true,
	navBarNoBorder: true,
	topBarElevationShadowEnabled: false,
	navBarTextColor : colors.darkGray,
	statusBarColor : '#f9f9f9',
	statusBarTextColorScheme : 'dark',
	navBarButtonColor :colors.lightGray
}