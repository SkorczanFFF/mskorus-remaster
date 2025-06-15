import React from 'react';
import {
  AiFillCar,
  AiFillCloseSquare,
  AiFillCompass,
  AiFillFilePdf,
  AiFillMail,
  AiOutlineGlobal,
} from 'react-icons/ai';
import { BiLogoJava, BiLogoPhp } from 'react-icons/bi';
import { BsCursorFill, BsGithub, BsGlobe2, BsLinkedin } from 'react-icons/bs';
import { GiGuitarBassHead } from 'react-icons/gi';
import { GrMysql } from 'react-icons/gr';
import { HiChip, HiMusicNote } from 'react-icons/hi';
import { HiMiniLanguage } from 'react-icons/hi2';
import {
  IoCallSharp,
  IoLogoCss3,
  IoLogoHtml5,
  IoLogoReact,
  IoLogoWordpress,
} from 'react-icons/io5';
import { RxHamburgerMenu } from 'react-icons/rx';
import {
  SiAdobephotoshop,
  SiAutodesk,
  SiBitbucket,
  SiBlender,
  SiCanva,
  SiFirebase,
  SiGitlab,
  SiJavascript,
  SiLaravel,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiNpm,
  SiPython,
  SiReact,
  SiRedux,
  SiSanity,
  SiSass,
  SiTailwindcss,
  SiThreedotjs,
  SiTypescript,
  SiVercel,
  SiYarn,
} from 'react-icons/si';

type IconType = React.FC<React.SVGProps<SVGSVGElement>>;

// Navigation Icons
export const CloseIcon = AiFillCloseSquare as IconType;
export const HamburgerIcon = RxHamburgerMenu as IconType;

// Social & Contact Icons
export const GithubIcon = BsGithub as IconType;
export const LinkedinIcon = BsLinkedin as IconType;
export const GlobalIcon = AiOutlineGlobal as IconType;
export const GlobeIcon = BsGlobe2 as IconType;
export const MailIcon = AiFillMail as IconType;
export const CallIcon = IoCallSharp as IconType;
export const PdfIcon = AiFillFilePdf as IconType;

// Programming Language Icons
export const JavaIcon = BiLogoJava as IconType;
export const PhpIcon = BiLogoPhp as IconType;
export const TypescriptIcon = SiTypescript as IconType;
export const PythonIcon = SiPython as IconType;
export const JavascriptIcon = SiJavascript as IconType;

// Framework & Library Icons
export const ReactIcon = IoLogoReact as IconType;
export const ReactNativeIcon = SiReact as IconType;
export const NextjsIcon = SiNextdotjs as IconType;
export const ReduxIcon = SiRedux as IconType;
export const LaravelIcon = SiLaravel as IconType;
export const NodejsIcon = SiNodedotjs as IconType;
export const ThreejsIcon = SiThreedotjs as IconType;

// Frontend Technology Icons
export const HtmlIcon = IoLogoHtml5 as IconType;
export const CssIcon = IoLogoCss3 as IconType;
export const TailwindIcon = SiTailwindcss as IconType;
export const SassIcon = SiSass as IconType;

// Database Icons
export const MysqlIcon = GrMysql as IconType;
export const MongodbIcon = SiMongodb as IconType;
export const FirebaseIcon = SiFirebase as IconType;

// CMS Icons
export const WordpressIcon = IoLogoWordpress as IconType;
export const SanityIcon = SiSanity as IconType;

// Design Tool Icons
export const PhotoshopIcon = SiAdobephotoshop as IconType;
export const AutodeskIcon = SiAutodesk as IconType;
export const BlenderIcon = SiBlender as IconType;
export const CanvaIcon = SiCanva as IconType;

// Development Tool Icons
export const CursorIcon = BsCursorFill as IconType;
export const GitlabIcon = SiGitlab as IconType;
export const BitbucketIcon = SiBitbucket as IconType;
export const NpmIcon = SiNpm as IconType;
export const YarnIcon = SiYarn as IconType;
export const VercelIcon = SiVercel as IconType;

// Hobby & Interest Icons
export const CarIcon = AiFillCar as IconType;
export const CompassIcon = AiFillCompass as IconType;
export const GuitarIcon = GiGuitarBassHead as IconType;
export const ChipIcon = HiChip as IconType;
export const MusicIcon = HiMusicNote as IconType;
export const LanguageIcon = HiMiniLanguage as IconType;
