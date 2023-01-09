import {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';

const useKeyboard = () => {
  let [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', e =>
      setKeyboardVisible(true),
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardVisible(false),
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return isKeyboardVisible;
};

export default useKeyboard;
