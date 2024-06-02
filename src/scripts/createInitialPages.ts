import "reflect-metadata";
//Fix import
import "shared/container";
import { container } from "tsyringe";
import { CreatePageService } from "modules/page/application/services/CreatePageService";
import { processAdditionalParams } from "modules/page/utils/processAdditionalParams";

async function main() {
  const pages = [
    {
      pathName: "/",
      title: "CEFET",
      description: "",
      additionalParams: {
        imageUrl:
          "https://www.cefet-rj.br/attachments/article/431/uned_friburgo01.jpg",
      },
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
      additionalParams: {
        minutesLink:
          "https://drive.google.com/drive/folders/0B2u-ugOQzUgEWDd1UzRaaWFMUlU?resourcekey=0-9jzVele3YMNXny7cJZ_qAQ&usp=drive_link",
        cepeLink: "tes",
      },
    },
  ];
  const createPageService = container.resolve(CreatePageService);

  await Promise.all(
    pages.map(async (page) => {
      const cleanAdditionalParams = processAdditionalParams(
        page.additionalParams
      );

      return await createPageService
        .execute({
          id: 0,
          pathName: page.pathName,
          title: page.title,
          description: page.description,
          additionalParams: cleanAdditionalParams,
        })
        .then(() => console.log(`Página ${page.title} criada\n`))
        .catch((error) =>
          console.error(
            `\nError ao criar a página: ${page.title}:\n`,
            error,
            "\n"
          )
        );
    })
  );

  process.exit(0);
}

main();
