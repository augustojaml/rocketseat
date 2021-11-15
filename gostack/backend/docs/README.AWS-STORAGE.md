# AWS STORAGE

- Go to => IAM | Users | Add Users

  - User name\* (Type name)
  - Check | Access key - Programmatic access | Next: Permissions
  - Select `Attach existing policies directly` and search for s3 and check `AmazonS3FullAccess` | Next: Tags
  - Next: Review
  - Create User
  - Next page copy two secret keys

- Go to S3 and Create Bucket

  - Bucket name (Type name)
  - Uncheck `Block all public access`
  - Check `I acknowledge that the current settings might result in this bucket and the objects within becoming public` and Create bucket

- Follow `src/shared/container/providers/StorageProvider/implementations/S3StorageProvider.ts`

  ```.env
  AWS_ACCESS_KEY_ID=
  AWS_SECRET_ACCESS_KEY=
  AWS_BUCKET=
  AWS_BUCKET_REGION=
  AWS_BUCKET_URL=
  AWS_REGION=
  ```
