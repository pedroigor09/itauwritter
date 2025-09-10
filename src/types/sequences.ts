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
        text: "Primeiramente! Respira fundo. Você não é um número em uma planilha. Você não é um erro de sistema, nem um dado descartável. Você é uma história, um esforço diário, alguém que já venceu tantas batalhas silenciosas que ninguém viu. Não foi falta de vontade. Não foi preguiça. E muito menos falta de valor. Foi apenas uma decisão fria de um mercado que às vezes esquece que por trás de cada crachá existe um coração que pulsa e uma família que espera. Mas nada disso define o seu futuro."
      },
      {
        id: 2,
        text: "Você não está sozinho. O que hoje parece perda, amanhã pode ser uma porta aberta que você ainda não consegue enxergar. A vida é dura, mas também é generosa com quem não desiste. Você já provou a si mesmo que pode chegar até aqui, e isso significa que pode ir ainda mais longe."
      },
      {
        id: 3,
        text: "Vamos recomeçar juntos. Aqui não há espaço para rótulos injustos, nem para generalizações cruéis. Aqui há espaço para acreditar em você de novo. O mundo ainda precisa do que só você pode oferecer."
      }
    ]
  },
  {
    id: 2,
    title: "Acolhimento coletivo",
    messages: [
      {
        id: 1,
        text: "É injusto quando a maioria paga pela minoria. É doloroso quando decisões são tomadas sem olhar para as histórias por trás de cada rosto. Mas não se engane: o seu valor não diminuiu. A sua entrega não desapareceu. O que você construiu, ninguém pode apagar."
      },
      {
        id: 2,
        text: "Talvez agora o silêncio pese. Talvez as dúvidas gritem. Mas você não precisa enfrentar isso sozinho. Existe uma rede inteira de pessoas passando pelo mesmo, e juntos podemos transformar dor em força, lágrimas em motivação, e despedidas em novos começos."
      },
      {
        id: 3,
        text: "Cada cicatriz que a vida te deu é também uma prova de que você sobreviveu. E vai sobreviver a essa também. Porque, apesar do que disseram, você não é preguiça. Você é resistência, resiliência e coragem."
      }
    ]
  },
  {
    id: 3,
    title: "Força interior",
    messages: [
      {
        id: 1,
        text: "Feche os olhos um instante. Você consegue sentir a força que ainda existe dentro de você? Ela não foi embora, só está machucada. Mas vai se levantar de novo. Porque você não chegou até aqui por sorte, chegou porque é capaz."
      },
      {
        id: 2,
        text: "Se hoje alguém tentou apagar o seu brilho, lembre: a sua luz não depende da aprovação de uma empresa. Depende da sua verdade, da sua coragem de levantar amanhã e continuar tentando."
      },
      {
        id: 3,
        text: "O amanhã pode parecer assustador, mas é também uma página em branco. E talvez seja justamente agora, nesse vazio, que a sua história mais bonita comece a ser escrita."
      }
    ]
  }
];
