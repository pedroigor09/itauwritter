export interface Message {
  id: number;
  text: string;
}

export interface Sequence {
  id: number;
  title: string;
  messages: Message[];
}

export const messageSequences: Sequence[] = [
  {
    id: 0,
    title: "Boas-vindas",
    messages: [
      {
        id: 1,
        text: "Oi, tudo bem? Fiquei sabendo da situação no Itaú. Sei que deve estar sendo um momento muito difícil pra você."
      },
      {
        id: 2,
        text: "Vim aqui não para dar conselhos vazios ou frases feitas, mas para te lembrar de algumas verdades que talvez você tenha esquecido nos últimos dias."
      }
    ]
  },
  {
    id: 1,
    title: "Recomeço e valor",
    messages: [
      {
        id: 1,
        text: "Primeiramente! Respira fundo. VOCÊ NÃO é um número em uma planilha. VOCÊ NÃO é um erro de sistema, nem um dado descartável. VOCÊ é uma HISTÓRIA, um esforço diário, alguém que já venceu tantas BATALHAS silenciosas que ninguém viu. NÃO foi falta de vontade. NÃO foi preguiça. E muito menos falta de VALOR. Foi apenas uma decisão fria de um mercado que às vezes esquece que por trás de cada crachá existe um CORAÇÃO que pulsa e uma família que espera. Mas nada disso define o seu FUTURO."
      },
      {
        id: 2,
        text: "VOCÊ NÃO está SOZINHO. O que hoje parece perda, amanhã pode ser uma porta aberta que você ainda não consegue enxergar. A vida é dura, mas também é GENEROSA com quem NÃO desiste. VOCÊ já provou a si mesmo que pode chegar até aqui, e isso significa que pode ir ainda mais LONGE."
      },
      {
        id: 3,
        text: "Vamos RECOMEÇAR JUNTOS. Aqui NÃO há espaço para rótulos injustos, nem para generalizações cruéis. Aqui há espaço para acreditar em VOCÊ de novo. O mundo ainda precisa do que só VOCÊ pode oferecer."
      }
    ]
  },
  {
    id: 2,
    title: "Acolhimento coletivo",
    messages: [
      {
        id: 1,
        text: "É injusto quando escolhas coletivas apagam méritos individuais.. É doloroso quando decisões são tomadas sem olhar para as HISTÓRIAS por trás de cada rosto. Mas NÃO se engane: o seu VALOR NÃO diminuiu. A sua entrega NÃO desapareceu. O que VOCÊ construiu, ninguém pode apagar."
      },
      {
        id: 2,
        text: "Talvez agora o silêncio pese. Talvez as dúvidas gritem. Mas VOCÊ NÃO precisa enfrentar isso SOZINHO. Existe uma rede inteira de pessoas passando pelo mesmo, e JUNTOS podemos transformar dor em FORÇA, lágrimas em motivação, e despedidas em novos começos."
      },
      {
        id: 3,
        text: "Cada cicatriz que a vida te deu é também uma prova de que VOCÊ sobreviveu. E vai sobreviver a essa também. Porque, apesar do que disseram, VOCÊ NÃO é preguiça. VOCÊ é RESISTÊNCIA, RESILIÊNCIA e CORAGEM."
      }
    ]
  },
  {
    id: 3,
    title: "Força interior",
    messages: [
      {
        id: 1,
        text: "Feche os olhos um instante. VOCÊ consegue sentir a FORÇA que ainda existe dentro de VOCÊ? Ela NÃO foi embora, só está machucada. Mas vai se levantar de novo. Porque VOCÊ NÃO chegou até aqui por sorte, chegou porque é CAPAZ."
      },
      {
        id: 2,
        text: "Se hoje alguém tentou apagar o seu BRILHO, lembre: a sua LUZ NÃO depende da aprovação de uma empresa. Depende da sua VERDADE, da sua CORAGEM de levantar amanhã e continuar tentando."
      },
      {
        id: 3,
        text: "O amanhã pode parecer assustador, mas é também uma página em branco. E talvez seja justamente agora, nesse vazio, que a sua HISTÓRIA mais bonita comece a ser escrita."
      }
    ]
  }
];
