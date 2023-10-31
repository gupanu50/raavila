import {Platform, PermissionsAndroid} from 'react-native';
import RNFS from 'react-native-fs';
import ReactNativeBlobUtil from 'react-native-blob-util';
import {showMessage} from 'react-native-flash-message';
export const downloadPdf = async (url: string, name: string) => {
  try {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Storage permission denied.');
        return;
      }
    }

    const fileDir =
      Platform.OS === 'android'
        ? RNFS.DownloadDirectoryPath
        : RNFS.DocumentDirectoryPath;
    const filePath = `${fileDir}/${name}.pdf`;
    RNFS.writeFile(filePath, name)
      .then(success => {
        console.log('FILE SAVED!');
      })
      .catch(err => {
        console.log(err.message);
      });
    ReactNativeBlobUtil.config({
      fileCache: false,
      appendExt: 'pdf',
      path: filePath,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        title: name,
        description: 'File downloaded by download manager.',
        mime: 'application/pdf',
      },
    })
      .fetch('GET', url)
      .then(response => {
        {
          showMessage({
            message: 'File Downloaded Successfully',
            type: 'success',
            autoHide: true,
            duration: 1500,
          });
        }
        console.log('file is downloaded', response);
      })
      .catch(error => {
        console.log('error is thrown', error);
      });
  } catch (error) {
    console.log('Error downloading file:', error);
  }
};
