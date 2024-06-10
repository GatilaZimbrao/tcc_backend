import prompt from "prompt";
import "reflect-metadata";
//Fix import
import "shared/container";
import { container } from "tsyringe";
import { CreateContactService } from "modules/contact/application/services/CreateContactService";

async function main() {
  prompt.start();
  const { email, name, tel } = await prompt.get<{
    email: string;
    name: string;
    tel: string;
  }>(["email", "name", "tel"]);

  const createContactService = container.resolve(CreateContactService);

  try {
    await createContactService.execute({
      id: 0,
      email: email,
      name: name,
      tel: tel,
    });
    console.log("Contact created");
  } catch (error) {
    console.error("Error creating contact", error);
  }
  process.exit(0);
}

main();
