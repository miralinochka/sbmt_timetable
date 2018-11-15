
import React, { PureComponent } from 'react';
import {
  SafeAreaView, Text, NetInfo, View,
} from 'react-native';
import styles from './styles';

function MiniOfflineSign() {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.offlineContainer}>
        <Text style={styles.offlineText}>Отсутствует Интернет-соединение</Text>
      </View>
    </SafeAreaView>
  );
}

class OfflineNotice extends PureComponent {
  state = {
    isConnected: true,
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  handleConnectivityChange = isConnected => this.setState({ isConnected });

  render() {
    const { isConnected } = this.state;
    // if (!isConnected) {
    //   return <MiniOfflineSign />;
    // }
    // return null;
    return <MiniOfflineSign />;
  }
}

// OfflineNotice.propTypes = {
//   onClick: PropTypes.func.isRequired,
//   visible: PropTypes.bool.isRequired,
// };

export default OfflineNotice;
