/* eslint-disable prettier/prettier */
import React from 'react';
import {Text,StyleSheet, View} from 'react-native';
interface SectionProps {
  children?: React.ReactNode;
  title: string;
}

const Section = (props: SectionProps) => {
  const {title, children} = props;

  return (
    <>
      <Text style={styles.title}>{title}</Text>
      <View>{children}</View>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    lineHeight: 28,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 3,
    marginTop: 20,
  },
});

export default Section;
