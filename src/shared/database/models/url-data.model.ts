import { UrlData } from '@domain/url/entities/url-data.entity';
import { Optional } from 'sequelize';
import {
  Column,
  CreatedAt,
  DataType,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({ tableName: 'urls' })
export class UrlDataModel
  extends Model<
    UrlData,
    Optional<UrlData, 'created' | 'updated' | 'id' | 'checked' | 'responseCode'>
  >
  implements UrlData
{
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  id!: string;
  @Column({ type: DataType.TEXT, allowNull: false })
  url!: string;
  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  responseCode!: number;
  @Column({ type: DataType.DATE, allowNull: true })
  checked!: Date | null;
  @CreatedAt
  created!: Date;
  @UpdatedAt
  updated!: Date;
}
