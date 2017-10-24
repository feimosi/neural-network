import { Injectable } from '@angular/core';

@Injectable()
export class ImageUploadService {
  submitImage(blob) {
    console.log('Received file: ', blob);
    const formData = new FormData();
    formData.append('image', blob);

    fetch('http://localhost:5080/submit', {
      method: 'POST',
      body: formData,
    });
  }
}