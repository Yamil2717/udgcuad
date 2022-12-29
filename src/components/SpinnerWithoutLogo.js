import React from 'react';
import {ActivityIndicator, StyleSheet, SafeAreaView, Text} from 'react-native';

function SpinnerWithoutLogo({text}) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{text || 'Cargando'}</Text>
      <ActivityIndicator size="large" color="#2A9DD8" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
  },
  logo: {
    width: 110,
    height: 110,
  },
});

export default SpinnerWithoutLogo;
