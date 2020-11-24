import { container } from 'tsyringe';
import uploadConfig from '@config/upload'

import IStorageProvider from './models/IStorageProvider';

import DiskStorageProvider from './implementations/DiskStorageProvider';
import S3StorageProdiver from './implementations/S3StorageProdiver';

const providers = {
  disk: DiskStorageProvider,
  s3: S3StorageProdiver,
}

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers[uploadConfig.driver],
);
