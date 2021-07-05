export interface IPrismaCrud<T> {
  getAll(params?: {
    skip?: number;
    take?: number;
    cursor?: any;
    where?: any;
    orderBy?: any;
  }): Promise<T[]>
  getOne(params: any): Promise<T | null>
  create(data: any): Promise<T>
  update(params: {
    where: any;
    data: any
  }): Promise<T>
  delete(params: any): Promise<T>
};
