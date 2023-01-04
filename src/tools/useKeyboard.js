import {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';

const useKeyboard = () => {
  let [isKeyboardVisible, setKeyboardVisible] = useState(false);
  let [heightKeyboard, setHeightKeyboard] = useState(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      e => {
        setHeightKeyboard(e.endCoordinates.screenY);
        setKeyboardVisible(true);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setHeightKeyboard(0);
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return {active: isKeyboardVisible, height: heightKeyboard};
};

export default useKeyboard;
