import { ColumnNameMappers, Model, snakeCaseMappers } from 'objection'

export class BaseModel extends Model {
  public static get columnNameMappers(): ColumnNameMappers {
    return snakeCaseMappers()
  }

  public static modelPaths = [__dirname]

  public readonly id!: string
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
  public readonly deletedAt!: Date
}
