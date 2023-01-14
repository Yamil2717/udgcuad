import {useEffect, useState} from 'react';
import {Keyboard, Platform} from 'react-native';

const useKeyboard = () => {
  let [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    let keyboardDidShowListener;
    let keyboardDidHideListener;
    if (Platform.OS === 'ios') {
      keyboardDidShowListener = Keyboard.addListener('keyboardWillShow', e =>
        setKeyboardVisible(true),
      );
      keyboardDidHideListener = Keyboard.addListener('keyboardWillHide', () =>
        setKeyboardVisible(false),
      );
    } else {
      keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', e =>
        setKeyboardVisible(true),
      );
      keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () =>
        setKeyboardVisible(false),
      );
    }

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return isKeyboardVisible;
};

export default useKeyboard;
