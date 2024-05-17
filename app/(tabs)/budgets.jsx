import { View } from 'react-native'

import StyledText from '../../components/shared/styledText'

const Budgets = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <StyledText type='header'>Budgets page</StyledText>
    </View>
  )
}

export default Budgets
