export enum Screen {
  Home = 'Home',
  Chat = 'Chat',
}

export enum ChatMode {
  Text = 'Text',
  Image = 'Image',
}

export interface ChatMessage {
  id: string;
  text: string; // Used for text messages, or as a caption/prompt for images
  sender: 'user' | 'model';
  timestamp: number;
  imageUrl?: string; // URL of the generated image
  imagePrompt?: string; // The prompt used to generate the image
}

export interface GroundingChunkWeb {
  uri: string;
  title: string;
}

export interface GroundingChunk {
 web: GroundingChunkWeb;
}

export type Theme = 'light' | 'dark';