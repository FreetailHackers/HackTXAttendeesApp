import AsyncStorageFactory from '@react-native-community/async-storage';
import LegacyStorage from '@react-native-community/async-storage-backend-legacy';

const legacyStorage = new LegacyStorage();

export type StorageModel = {
    auth_token : {
        auth_token : string
    }
}

const storage = AsyncStorageFactory.create<StorageModel>(legacyStorage, undefined);

export default storage;