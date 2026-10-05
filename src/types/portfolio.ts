export type WorkType = "video" | "youtube" | string;

export interface WorkItem {
  id: string;
  type: WorkType;
  ratio?: string;     // e.g. "9:16", "4:3", "16:9", "1:1", or empty
  section?: "portrait" | "landscape" | string;
  title: string;
  client: string;
  project: string;
  year: number | string;
  tags?: string[];
  src: string;
  poster?: string;
  alt?: string;
  captions?: string;
  featured?: boolean;
}

export interface SectionConfig {
  id: "portrait" | "landscape" | string;
  label: string;
  show: boolean;
}

export interface SocialLink {
  label: string;
  url: string;
  icon: string;
}

export interface AboutSkill {
  name: string;
  category: string;
  icon?: string;
}

export interface AboutService {
  number: string;
  title: string;
  description: string;
  tag: string;
}

export interface AboutStat {
  value: string;
  label: string;
}

export interface AboutConfig {
  badge: string;
  title: string;
  headline: string;
  story: string[];
  skillsTitle?: string;
  skills: AboutSkill[];
  servicesTitle?: string;
  services: AboutService[];
  stats: AboutStat[];
  calloutTitle?: string;
  calloutSubtitle?: string;
  calloutButton?: string;
}

export interface ContactCategoryOption {
  value: string;
  label: string;
}

export interface ContactConfig {
  badge: string;
  title: string;
  subtitle: string;
  email: string;
  emailLabel?: string;
  copyEmailLabel?: string;
  copiedEmailLabel?: string;
  sendEmailLabel?: string;
  whatsapp?: string;
  whatsappLabel?: string;
  chatWhatsappLabel?: string;
  location?: string;
  availability?: string;
  formTitle?: string;
  formSubtitle?: string;
  nameLabel?: string;
  namePlaceholder?: string;
  emailInputLabel?: string;
  emailInputPlaceholder?: string;
  categoryLabel?: string;
  categoryOptions?: ContactCategoryOption[];
  messageLabel?: string;
  messagePlaceholder?: string;
  submitButtonLabel?: string;
  successTitle?: string;
  successMessage?: string;
  newInquiryButtonLabel?: string;
}

export interface NavigationConfig {
  home: string;
  karya: string;
  tentang: string;
  kontak: string;
}

export interface HighlightConfig {
  badge: string;
  title: string;
  description: string;
  ctaLabel: string;
  reelsTitle: string;
  reelsSubtitle: string;
  landscapeTitle: string;
  bannerTitle: string;
  bannerDescription: string;
  bannerCta: string;
}

export interface WorksSectionConfig {
  badge: string;
  title: string;
  allFilterLabel: string;
  portraitSubtitle: string;
  landscapeSubtitle: string;
  emptyMessage: string;
  emptyButtonLabel: string;
}

export interface ViewerConfig {
  loadingText?: string;
  errorTitle?: string;
  errorMessage?: string;
  directLinkText?: string;
  copyLinkText?: string;
  copiedLinkText?: string;
  prevLabel?: string;
  nextLabel?: string;
  closeLabel?: string;
}

export interface FooterConfig {
  copyrightText?: string;
  backToTopText?: string;
}

export interface UIConfig {
  skipToContent?: string;
  reducedMotionOnText?: string;
  reducedMotionOffText?: string;
  themeLightTooltip?: string;
  themeDarkTooltip?: string;
}

export interface PortfolioConfig {
  profile: {
    name: string;
    roleBadge: string;
    statusBadge: {
      show: boolean;
      text: string;
      dot: "green" | "yellow" | "purple" | "none" | string;
    };
    headline: {
      before: string;
      highlight: string;
      after: string;
    };
    bio: string;
    primaryCta: {
      label: string;
      target: string;
      icon: string;
    };
    secondaryCta?: {
      label: string;
      url: string;
    };
    photo: string;
    photoAlt: string;
    photoCaption?: {
      title: string;
      location: string;
    };
    sticker?: {
      text: string;
      action: "confetti" | "link" | "none" | string;
      url?: string;
    };
    tiltDegrees: number;
    email?: string;
    location?: string;
    marqueeText?: string;
  };
  navigation?: NavigationConfig;
  highlight?: HighlightConfig;
  worksSection?: WorksSectionConfig;
  about?: AboutConfig;
  contact?: ContactConfig;
  viewer?: ViewerConfig;
  footer?: FooterConfig;
  ui?: UIConfig;
  links: SocialLink[];
  theme: {
    primary: string;
    secondary: string;
    accent: string;
    highlight: string;
    background: string;
    surface: string;
    text: string;
    clientAccents: string[];
    fontHeading: string;
    fontBody: string;
    borderWidth: string;
    radius: string;
    shadowOffset: string;
    shadowOffsetSm?: string;
    shadowOffsetLg?: string;
    effects: {
      sticker: boolean;
      marquee: boolean;
      hoverBounce: boolean;
      confetti: boolean;
      reducedMotionAllowed: boolean;
    };
    mode?: "light" | "dark" | "system";
  };
  cloudinary: {
    cloudName: string;
    defaultTransform: string;
  };
  sections: SectionConfig[];
  works: WorkItem[];
}
