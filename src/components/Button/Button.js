/** @format */

import { Text, StyleSheet, TouchableOpacity } from 'react-native';

function StyledButton({ onPress, style, ...props }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.wrapper, { ...style }]}
      {...props}
    >
      <Text style={styles.title}>{props.title}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#519283',
    borderRadius: 10,
    maxWidth: 200,
    maxHeight: 50,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
});
export default StyledButton;
