export type Section = {
  title: string;
  body: string;
};

export type QuestionAnswer = {
  question: string;
  answer: string;
};

export type IconSection = {
  title: string;
  body: string;
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
};

export type HowItWorksSection = {
  title: string;
  body: string;
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  image: string;
};

export type Copy = {
  howItWorksFlow: HowItWorksSection[];
  pitch: {
    header: string;
    body: string;
  };
  featureHeader: string;
  featureFlow: IconSection[];
  faq: QuestionAnswer[];
  cta: string;
};

export const Copy: Copy = {
  howItWorksFlow: [],
  pitch: {
    header: "Get a Fair Price Everytime",
    body: "No more having to deal with not knowing whether the price a contractor is offering you is actually a fair or price or the lowest price you can get. With Estimax you get complete transparency. Multiple service providers bid against each other and legitimatize their bid with descriptions of the work they will provide.",
  },
  featureHeader: "Tools to get your job done",
  featureFlow: [],
  faq: [
    {
      question:
        "What if I already know a contractor that would be great for the job?",
      answer: "fdafdasfsdafsdafsdafasdfasdf",
    },
    {
      question:
        "I’m on a time crunch though and I don’t have time to wait for bids. How quickly can I find a contractor?",
      answer: "fdafasfdasdfasd",
    },
    {
      question: "Do I always have to pick the contractor with the lowest bid?",
      answer: "fdasfsadfasfsafd",
    },
  ],
  cta: "Start your one month free trial today",
};
