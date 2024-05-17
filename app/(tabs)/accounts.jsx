import { View } from 'react-native'

import StyledText from '../../components/shared/styledText'

const Accounts = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <StyledText type='header'>Accounts page</StyledText>
    </View>
  )
}

export default Accounts
