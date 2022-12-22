import {Platform} from 'react-native';
class Tools {
  formDataSinglePhoto(photo) {
    const data = new FormData();
    data.append('picture', {
      name: photo.fileName,
      type: photo.type,
      uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
    });
    return data;
  }
  formDataMultiplePhotos(photos) {
    const data = new FormData();

    photos.map(photo => {
      data.append('picture', {
        name: photo.fileName,
        type: photo.type,
        uri:
          Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
      });
    });

    return data;
  }
}

const tools = new Tools();

export default tools;
