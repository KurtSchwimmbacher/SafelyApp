import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, GlobalStyles, Radius, Spacing, Typography } from '../styles/GlobalStyles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import RegisterForm from './formComponents/RegisterForm';

interface LoginModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function LoginModal({ visible, onClose }: LoginModalProps) {
    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent
            onRequestClose={onClose}
        >

            <View style={styles.overlay}>
                <View style={styles.content}>

                    {/* header */}
                    <View style={styles.header}>
                        {/* spacer to balance the close icon */}
                        <View style={styles.sideSpacer} />
                        <Text style={[Typography.body, styles.headerTitle, { color: Colors.primaryLight }]}>Register</Text>
                        <TouchableOpacity
                            onPress={onClose}
                            style={styles.closeButton}
                        >
                            <MaterialCommunityIcons name="close" size={24} color={Colors.primaryLight} />
                        </TouchableOpacity>
                    </View>

                    {/* Login Form */}
                    <View style={GlobalStyles.container}>
                        <RegisterForm />
                    </View>
                </View>
            </View>
        </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  content: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: Radius.lg,
    borderTopRightRadius: Radius.lg,
    minHeight: 800,
    overflow: 'hidden',
  },
  header: {
    height: Spacing.xl*2,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: Colors.light,
    paddingHorizontal: Spacing.lg,
  },
  headerTitle:{
    flex: 1,
    textAlign: 'center',
  },
  closeButton: {
    padding: Spacing.sm,
  },
  sideSpacer: {
  width: 32, // Same width as the close icon area for symmetry
    },
});
