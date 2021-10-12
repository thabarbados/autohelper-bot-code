import { IScenesModule } from '@src/domain';

export class ScenesModule implements IScenesModule {
  private _loadOrderPhotoStartTime: bigint = 0n;
  private _loadCarDocsPhotoStartTime: bigint = 0n;

  private _isExpiredOrderPhotoLoading: boolean = false;
  private _isExpiredCarDocsPhotoLoading: boolean = false;

  constructor() {}

  public get loadOrderPhotoStartTime(): bigint {
    return this._loadOrderPhotoStartTime;
  }

  public get loadCarDocsPhotoStartTime(): bigint {
    return this._loadCarDocsPhotoStartTime;
  }

  public get isExpiredOrderPhotoLoading(): boolean {
    return this._isExpiredOrderPhotoLoading;
  }

  public get isExpiredCarDocsPhotoLoading(): boolean {
    return this._isExpiredCarDocsPhotoLoading;
  }

  public setLoadOrderPhotoStartTime = (time: bigint): void => {
    this._loadOrderPhotoStartTime = time;
  };

  public setLoadCarDocsPhotoStartTime = (time: bigint): void => {
    this._loadCarDocsPhotoStartTime = time;
  };

  public setOrderPhotoLoadingStatus = (isExpired: boolean): void => {
    this._isExpiredOrderPhotoLoading = isExpired;
  };

  public setCarDocsPhotoLoadingStatus = (isExpired: boolean): void => {
    this._isExpiredCarDocsPhotoLoading = isExpired;
  };
}
