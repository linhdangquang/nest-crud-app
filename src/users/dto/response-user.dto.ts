export default class ResponseUserDto {
  id: number;
  name: string;
  email: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  constructor(user: any) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.status = user.status;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    this.deletedAt = user.deletedAt;
  }

  static from(user: any) {
    return new ResponseUserDto(user);
  }

  static fromMany(users: any[]) {
    return users.map((user) => new ResponseUserDto(user));
  }
}
