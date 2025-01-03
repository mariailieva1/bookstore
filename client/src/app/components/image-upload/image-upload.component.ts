import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ImagesService } from 'src/app/services/images/images.service';

@Component({
  selector: 'app-image-upload',
  imports: [CommonModule, FormsModule],
  providers: [ImagesService],
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.scss',
})
export class ImageUploadComponent {
  @Input({ alias: 'productId', required: true })
  productId!: number;

  selectedFiles: File[] = [];
  uploadProgress: number | null = null;

  constructor(private imagesService: ImagesService) {}

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFiles = Array.from(input.files);
    }
  }

  onSubmit(): void {
    if (this.selectedFiles.length > 0) {
      // Mock upload logic for demo purposes
      this.uploadProgress = 0;

      this.imagesService
        .uploadImages(this.productId, this.selectedFiles)
        .subscribe((result) => {
          this.uploadProgress = 100;
        });
      // const interval = setInterval(() => {
      //   if (this.uploadProgress !== null && this.uploadProgress < 100) {
      //     this.uploadProgress += 10;
      //   } else {
      //     clearInterval(interval);
      //   }
      // }, 200);
    }
  }
}
