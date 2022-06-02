interface ICreateQuestionaireDTO {
  title: string;
  questions: [
    {
      question: string;
      answer: boolean;
      value: number;
    }
  ];
}

export { ICreateQuestionaireDTO };
