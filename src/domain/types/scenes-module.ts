export interface IScenesModule {
  readonly loadOrderPhotoStartTime: bigint;
  readonly loadCarDocsPhotoStartTime: bigint;
  readonly isExpiredOrderPhotoLoading: boolean;
  readonly isExpiredCarDocsPhotoLoading: boolean;

  setLoadOrderPhotoStartTime(time: bigint): void;
  setLoadCarDocsPhotoStartTime(time: bigint): void;
  setOrderPhotoLoadingStatus(isExpired: boolean): void;
  setCarDocsPhotoLoadingStatus(isExpired: boolean): void;
}
