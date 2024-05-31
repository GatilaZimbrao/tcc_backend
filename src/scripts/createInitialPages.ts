import "reflect-metadata";
//Fix import
import "shared/container";
import { container } from "tsyringe";
import { CreatePageService } from "modules/page/application/services/CreatePageService";

async function main() {
  const pages = [
    {
      pathName: "/",
      title: "CEFET",
      description: "",
      additionalParams: "",
    },
    {
      pathName: "/documentos",
      title: "Documentos Institucionais",
      description:
        "Aqui você vai encontrar todos os documentos institucionais que precisar.",
      additionalParams: "",
    },

    {
      pathName: "/docentes",
      title: "Corpo Docente",
      description:
        "Aqui você encontrará todos os membros do nosso corpo docente, além dos links para seus Currículos Lattes, onde poderão ser encontradas mais informações.",
      additionalParams: "",
    },

    {
      pathName: "/contato",
      title: "Contato",
      description:
        "Se você tem alguma dúvida, sugestão, ou deseja mais informações, Entre em contato.",
      additionalParams: "",
    },

    {
      pathName: "/programas",
      title: "Programas de Extensão",
      description: "",
      additionalParams: "",
    },

    {
      pathName: "/projetos",
      title: "Projetos de Extensão",
      description: "",
      additionalParams: "",
    },

    {
      pathName: "/colegiado",
      title: "Colegiado",
      description: "",
      additionalParams: "",
    },
  ];
  const createPageService = container.resolve(CreatePageService);

  await Promise.all(
    pages.map(
      async (page) =>
        await createPageService
          .execute({
            id: 0,
            pathName: page.pathName,
            title: page.title,
            description: page.description,
            additionalParams: page.additionalParams,
          })
          .then(() => console.log(`Página ${page.title} criada\n`))
          .catch((error) =>
            console.error(
              `\nError ao criar a página: ${page.title}:\n`,
              error,
              "\n"
            )
          )
    )
  );

  process.exit(0);
}

main();
