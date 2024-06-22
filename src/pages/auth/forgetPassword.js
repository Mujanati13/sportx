import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

function MotDePasseOublie({navigation}) {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(2);

  const handleEmailChange = text => {
    setEmail(text);
  };

  const handleCodeChange = text => {
    setCode(text);
  };

  const handleNewPasswordChange = text => {
    setNewPassword(text);
  };

  const checkEmail = async () => {
    const checkEmailResponse = await fetch(
      'https://fithouse.pythonanywhere.com/api/reset_password/check_email_client',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email}),
      },
    );
    if (!checkEmailResponse.ok) {
      throw new Error('Email not found');
    }
    const res = await checkEmailResponse.json();
    console.log(res);
    if (res.status) {
      setStep(1);
    }
  };
  const checkCode = async () => {
    try {
      const checkCodeResponse = await fetch(
        'https://fithouse.pythonanywhere.com/api/reset_password/check_code_client',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email, code}),
        },
      );
      if (!checkCodeResponse.ok) {
        throw new Error('Invalid code');
      }
      const res = await checkCodeResponse.json();
      console.log(res);
      if (res.status) {
        setStep(1);
      }
    } catch (error) {
      console.error('Error checking code:', error.message);
    }
  };
  const resetCode = async () => {
    try {
      const resetPasswordResponse = await fetch(
        'https://fithouse.pythonanywhere.com/api/reset_password/new_password_client',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email, code, password, confirm_password}),
        },
      );
      if (!resetPasswordResponse.ok) {
        throw new Error('Failed to reset password');
      }
      const res = await resetPasswordResponse.json();
      if (res.status) {
        // Assuming the password reset was successful
        // You may want to handle this according to your application flow
        console.log('Password reset successful');
      }
    } catch (error) {
      console.error('Error resetting password:', error.message);
    }
  };

  const handleResetPassword = () => {
    // Implement password reset logic here
    console.log(
      'Password reset request for email:',
      email,
      ', code:',
      code,
      ', new password:',
      newPassword,
    );
  };

  return (
    <>
      {step === 0 ? (
        <View style={styles.container}>
          <Text style={styles.title}>Mot de passe oublié</Text>
          <Text style={styles.subtitle}>
            Veuillez entrer votre adresse e-mail pour réinitialiser votre mot de
            passe.
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Entrez votre adresse e-mail"
              onChangeText={handleEmailChange}
              value={email}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={checkEmail}>
              <Text style={styles.button}>Valider</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.goBack}>Retour</Text>
          </TouchableOpacity>
        </View>
      ) : step === 1 ? (
        <View style={styles.container}>
          <Text style={styles.title}>Mot de passe oublié</Text>
          <Text style={styles.subtitle}>
            Veuillez entrer le code reçu par e-mail.
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Code"
              onChangeText={handleCodeChange}
              value={code}
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={handleResetPassword}>
              <Text style={styles.button}>Suivant</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.goBack}>Retour</Text>
          </TouchableOpacity>
        </View>
      ) : step === 2 ? (
        <View style={styles.container}>
          <Text style={styles.title}>Mot de passe oublié</Text>
          <Text style={styles.subtitle}>
            Veuillez entrer un nouveau mot de passe.
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Nouveau mot de passe"
              onChangeText={handleNewPasswordChange}
              value={newPassword}
              autoCapitalize="none"
              secureTextEntry
            />
            <TouchableOpacity onPress={handleResetPassword}>
              <Text style={styles.button}>Réinitialiser le mot de passe</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.goBack}>Retour</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    color: 'black',
    fontWeight: '500',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 17,
    fontWeight: '400',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#324EFF',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    height: 60,
    fontSize: 15,
    marginTop: 10,
  },
  button: {
    textAlign: 'center',
    height: 60,
    padding: 15,
    backgroundColor: 'red',
    marginTop: 10,
    color: 'white',
    borderRadius: 10,
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 30,
  },
  goBack: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'blue',
  },
});

export default MotDePasseOublie;
