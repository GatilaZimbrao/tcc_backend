import { container } from "tsyringe";
import { IBcrypt } from "../bcrypt";
import { Bcrypt } from "../implementation/bcryptImpl";

container.registerSingleton<IBcrypt>("bcrypt", Bcrypt);
