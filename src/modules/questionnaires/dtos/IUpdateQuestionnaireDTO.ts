interface IUpdateQuestionnaireDTO {
  title?: string;
  questions?: [
    {
      question?: string;
      answer?: boolean;
      value?: number;
    }
  ];
}

export { IUpdateQuestionnaireDTO };
