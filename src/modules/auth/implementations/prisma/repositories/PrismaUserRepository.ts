import { PrismaClient, User } from "@prisma/client";
import { UserRepository } from "modules/auth/domain/repositories/UserRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(
    @inject("PrismaClient")
    private prisma: PrismaClient
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    return user;
  }

  async findById(id: number): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        id: id,
      },
    });
    return user;
  }

  async create(user: User): Promise<User | null> {
    const newUser = await this.prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        password: user.password,
        role: user.role,
      },
    });
    return newUser;
  }
}
