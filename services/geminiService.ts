// This is your "Waiter" file. It talks to the AI for you.
// File: services/geminiService.ts

// FIX: Import from '@google/genai' and use GoogleGenAI and Type.
import { GoogleGenAI, Type } from "@google/genai";

// These are the "inputs" your frontend (CampaignForm.tsx) will send
export type CampaignSettings = {
  product_description: string;
  brand_voice: string;
  author_name: string;
  gen_twitter: boolean;
  gen_instagram: boolean;
  gen_linkedin: boolean;
  gen_facebook: boolean;
  gen_quora: boolean;
};

// This is the "output" JSON structure the AI will return
export type CampaignOutput = {
  author: string;
  poweredBy: string;
  tweets: string[];
  instagram_posts: { caption: string; image_idea: string }[];
  linkedin_post: string;
  facebook_post: string;
  quora_answer: string;
};

// This is the main "Waiter" function your app calls
export const generateCampaign = async (settings: CampaignSettings): Promise<CampaignOutput> => {
  
  // 1. This is the secure "Kitchen" connection.
  // AI Studio automatically provides the API key.
  if (!process.env.API_KEY) {
    throw new Error('API_KEY environment variable not set.');
  }
  // FIX: Initialize with an object containing the apiKey as per guidelines.
  const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
  
  // 2. This is your "System Instruction" for the AI.
  const systemInstruction = `You are an expert Social Media Strategist. Your name is "Code Vibe Assistant".
Your task is to generate a dynamic social media campaign.
You MUST ONLY generate content for the platforms where the boolean is true.`;

  // 3. This is the user's prompt.
  const user_prompt = `
    Here is the user's request:
    Product Description: ${settings.product_description}
    Brand Voice: ${settings.brand_voice}
    Author: ${settings.author_name}
    Generate Twitter: ${settings.gen_twitter}
    Generate Instagram: ${settings.gen_instagram}
    Generate LinkedIn: ${settings.gen_linkedin}
    Generate Facebook: ${settings.gen_facebook}
    Generate Quora: ${settings.gen_quora}
  `;

  try {
    // 4. Call the AI using the new ai.models.generateContent method
    const response = await ai.models.generateContent({
        // FIX: Use the recommended 'gemini-2.5-flash' model instead of the prohibited 'gemini-1.5-flash'.
        model: 'gemini-2.5-flash',
        contents: user_prompt,
        config: {
            systemInstruction: systemInstruction,
            // Tell the AI to *only* output JSON
            responseMimeType: 'application/json',
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    author: { type: Type.STRING },
                    poweredBy: { type: Type.STRING },
                    tweets: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING }
                    },
                    instagram_posts: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                caption: { type: Type.STRING },
                                image_idea: { type: Type.STRING }
                            },
                            required: ['caption', 'image_idea']
                        }
                    },
                    linkedin_post: { type: Type.STRING },
                    facebook_post: { type: Type.STRING },
                    quora_answer: { type: Type.STRING }
                },
                required: ['author', 'poweredBy', 'tweets', 'instagram_posts', 'linkedin_post', 'facebook_post', 'quora_answer']
            }
        },
    });

    // 5. Get the text response directly from the .text property
    const text = response.text;
    
    if (!text) {
      throw new Error('The AI returned an empty response.');
    }

    // 6. Parse the AI's JSON string and return it
    const jsonOutput = JSON.parse(text) as CampaignOutput;
    return jsonOutput;

  } catch (error) {
    console.error('Error calling Gemini API:', error);
    if (error instanceof SyntaxError) {
      throw new Error('Failed to parse the response from the AI. The AI may have returned an invalid JSON format.');
    }
    throw new Error('An unexpected error occurred while generating the campaign.');
  }
};