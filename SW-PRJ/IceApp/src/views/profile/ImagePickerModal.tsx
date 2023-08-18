import {SafeAreaView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Modal, Pressable, Text} from 'native-base';

interface ImagePickerModalProps {
  isVisible: boolean;
  onClose: () => void;
  onImageLibraryPress: () => void;
  onCameraPress: () => void;
}

export function ImagePickerModal({
  isVisible,
  onClose,
  onImageLibraryPress,
  onCameraPress,
}: ImagePickerModalProps) {
  return (
    <Modal isOpen={isVisible} onClose={onClose} safeAreaBottom={true}>
      <Modal.Content maxWidth="400px">
        <Modal.Header backgroundColor={'red.500'}>
          <Text
            color="white"
            fontWeight={'500'}
            fontSize={'14'}
            textAlign={'center'}>
            Select image from library or camera
          </Text>
        </Modal.Header>
        <Modal.Body
          display={'flex'}
          flexDirection={'row'}
          justifyContent={'space-between'}>
          <Pressable
            onPress={onImageLibraryPress}
            flexDirection={'column'}
            alignItems={'center'}>
            <Ionicons name="albums" size={30} />
            <Text>Library</Text>
          </Pressable>
          <Pressable
            onPress={onCameraPress}
            flexDirection={'column'}
            alignItems={'center'}>
            <Ionicons name="camera" size={30} />
            <Text>Camera</Text>
          </Pressable>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
}
