import { ReactComponent as PostIcon } from '../../assets/PostIcon.svg';
import { ReactComponent as HeartIcon } from '../../assets/HeartIcon.svg';
import { ReactComponent as CameraIcon } from '../../assets/CameraIcon.svg';

import { ReactComponent as PhoneIcon } from '../../assets/PhoneIcon.svg';
import { ReactComponent as DollarIcon } from '../../assets/DollarIcon.svg';
import { ReactComponent as TrophyIcon } from '../../assets/TrophyIcon.svg';

import { ReactComponent as MessageIcon } from '../../assets/MessagesIcon.svg';
import { ReactComponent as CalculatorIcon } from '../../assets/CalculatorIcon.svg';
import { ReactComponent as PersonAddIcon } from '../../assets/PersonAddIcon.svg';

import SnapImage from '../../assets/Snap.png';
import PickImage from '../../assets/Pick.png';
import BidImage from '../../assets/Bid.png';
import WinImage from '../../assets/Win.png';
import ScrollImage from '../../assets/Scroll.png';
import PostImage from '../../assets/Post.png';


export type Section = {
  title: string,
  body: string
}

export type QuestionAnswer = {
  question: string,
  answer: string
}

export type IconSection = {
  title: string,
  body: string,
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

export type HowItWorksSection = {
  title: string,
  body: string,
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  image: string;
}

export type Copy = {
  howItWorksFlow: HowItWorksSection[],
  pitch: {
    header: string,
    body: string
  },
  featureHeader: string,
  featureFlow: IconSection[],
  faq: QuestionAnswer[],
  cta: string,
}

export const Copy : Copy = {
  howItWorksFlow: [
    {
      title: "Snap",
      body: "Take pictures of your job and write a description about the project.",
      Icon: CameraIcon,
      image: SnapImage
    },
    {
      title: "Post",
      body: "Post your job and message service proiders to understand their work.",
      Icon: PostIcon,
      image: PostImage
    },
    {
      title: "Pick",
      body: "Look at your service pros bids and background and pick your winner.",
      Icon: HeartIcon,
      image: PickImage
    }
  ],
  pitch: {
    header: "Get a Fair Price Everytime",
    body: "No more having to deal with not knowing whether the price a contractor is offering you is actually a fair or price or the lowest price you can get. With Estimax you get complete transparency. Multiple service providers bid against each other and legitimatize their bid with descriptions of the work they will provide."
  },
  featureHeader: "Tools to get your job done",
  featureFlow: [
    {
      title: "Message",
      body: "Homeowners post projects with written description, photos, and videos including any key details.",
      Icon: MessageIcon
    },
    {
      title: "Get Clear Estimates",
      body: "Vetted service pros access a “social media” feed of projects in their area of expertise and submit anonymous questions and bids to homeowners.",
      Icon: CalculatorIcon
    },
    {
      title: "Invite Contractors",
      body: "Homeowners answer questions in the public Q&A, evaluate their list of blinded bids alongside reviews of each pro, and select their winner.",
      Icon: PersonAddIcon
    }
  ],
  faq: [
    {
      question: "What if I already know a contractor that would be great for the job?",
      answer: "fdafdasfsdafsdafsdafasdfasdf"
    },
    {
      question: "I’m on a time crunch though and I don’t have time to wait for bids. How quickly can I find a contractor?",
      answer: "fdafasfdasdfasd"
    },
    {
      question: "Do I always have to pick the contractor with the lowest bid?",
      answer: "fdasfsadfasfsafd"
    }
  ],
  cta: "Start your one month free trial today"
}