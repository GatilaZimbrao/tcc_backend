import prompt from "prompt";
import "reflect-metadata";
//Fix import
import "shared/container";
import { container } from "tsyringe";
import { RegisterUserService } from "modules/auth/application/services/RegisterUserService";
import { ROLES } from "modules/auth/domain/models/RoleModel";

async function main() {
  prompt.start();
  const { email, password, name } = await prompt.get<{
    email: string;
    password: string;
    name: string;
  }>(["email", "name", "password"]);

  const register = container.resolve(RegisterUserService);

  try {
    await register.execute({
      id: 0,
      email: email,
      name: name,
      password: password,
      role: ROLES.admin,
    });
    console.log("Admin created");
  } catch (error) {
    console.error("Error creating admin", error);
  }
  process.exit(0);
}

main();
