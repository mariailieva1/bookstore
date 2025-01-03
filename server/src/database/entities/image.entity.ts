import { convertBlobToBase64 } from '../../helpers/image-to-base64';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('images')
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'longblob',
    transformer: {
      to(value) {
        return value;
      },
      from: convertBlobToBase64,
    },
  })
  fullSize: string;
}
