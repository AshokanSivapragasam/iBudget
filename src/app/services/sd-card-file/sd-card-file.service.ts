import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file/ngx';

@Injectable({
  providedIn: 'root'
})
export class SdCardFileService {

  constructor(private file: File) {

  }

  writeFile(directoryPath: string, filename: string, data: string): Promise<void> {
    return this.file.writeExistingFile(directoryPath, filename, data);
  }
}
