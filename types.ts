
export interface CampaignSettings {
  productDescription: string;
  brandVoice: string;
  authorName: string;
  platforms: {
    twitter: boolean;
    instagram: boolean;
    linkedin: boolean;
    facebook: boolean;
    quora: boolean;
  };
}

export interface InstagramPost {
  caption: string;
  image_idea: string;
}

export interface CampaignOutput {
  author: string;
  poweredBy: string;
  tweets: string[];
  instagram_posts: InstagramPost[];
  linkedin_post: string;
  facebook_post: string;
  quora_answer: string;
}
