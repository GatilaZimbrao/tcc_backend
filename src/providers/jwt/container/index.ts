import { container } from "tsyringe";
import { Jwt } from "../implementations/jwtImpl";
import { IJwt } from "../jwt";

container.registerSingleton<IJwt>("jwt", Jwt);
