interface values {
  entityName: string;
  skipe: number;
  take: number;
}

abstract class Pagination {
  public abstract factoryMethod(): values;

  private createRelationalName(): string {
    const pagination = this.factoryMethod();

    return `inputPagination-${pagination.entityName}`;
  }
}
