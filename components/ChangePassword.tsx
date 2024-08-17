import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import {apiService} from '../src/services/api-service';
import Toast from 'react-native-toast-message';

const ChangePassword: React.FC = () => {
  const route = useRoute();
  const {token} = route?.params;
  const {navigate} = useNavigation();
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const isInValidatePassword = (password: string) => {
    if (password.length < 5) {
      return true;
    }
  };

  const handleChangePassword = async () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    if (isInValidatePassword(newPassword)) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Password',
        text2: 'Password must be at least 5 characters long'
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'New password and confirm password do not match.',
      });
      return;
    }
    // Implement password change logic here (API call, etc.)
    const payload = {
      password: newPassword,
      token,
    };
    await apiService
      .resetPassword(payload)
      .then(res => {
        Toast.show({
          type: 'success',
          text1: 'Password changed successfully!',
        });
        navigate('signin')
      })
      .catch(err => {
        console.log(err);
        Toast.show({
          type: 'error',
          text1: 'Failed to change password',
        });
      });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/password.jpg')}
        style={{
          width: 200,
          height: 200,
          alignSelf: 'center',
          marginTop: -200,
          marginBottom: 20,
        }}
      />
      <Text style={styles.label}>New Password:</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder="Enter new password"
        value={newPassword}
        onChangeText={setNewPassword}
      />

      <Text style={styles.label}>Confirm New Password:</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder="Confirm new password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontFamily: 'Poppins Regular',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    fontFamily: 'Poppins Regular',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins Regular',
    borderRadius: 10,
  },
});

export default ChangePassword;
