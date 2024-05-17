import { View } from 'react-native'

import StyledText from '../../components/shared/styledText'

const Settings = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <StyledText type='header'>Settings page</StyledText>
    </View>
  )
}

export default Settings
