// This is your "Waiter" file. It talks to the AI for you.
// File: services/geminiService.ts

// Import from '@google/genai' and use GoogleGenAI and Type.
import { GoogleGenAI, Type } from "@google/genai";
import type { CampaignSettings, CampaignOutput } from '../types';

// This is the main "Waiter" function your app calls
export const generateCampaign = async (settings: CampaignSettings): Promise<CampaignOutput> => {
  
  // 1. This is the secure "Kitchen" connection.
  // AI Studio automatically provides the API key.
  if (!process.env.API_KEY) {
    throw new Error('API_KEY environment variable not set.');
  }
  // Initialize with an object containing the apiKey as per guidelines.
  const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
  
  // 2. This is your "System Instruction" for the AI.
  const systemInstruction = `You are an expert Social Media Strategist. Your name is "Code Vibe Assistant".
Your task is to generate a dynamic social media campaign.
You MUST ONLY generate content for the platforms where the boolean is true.`;

  // 3. This is the user's prompt.
  const user_prompt = `
    Here is the user's request:
    Product Description: ${settings.productDescription}
    Brand Voice: ${settings.brandVoice}
    Author: ${settings.authorName}
    Generate Twitter: ${settings.platforms.twitter}
    Generate Instagram: ${settings.platforms.instagram}
    Generate LinkedIn: ${settings.platforms.linkedin}
    Generate Facebook: ${settings.platforms.facebook}
    Generate Quora: ${settings.platforms.quora}
  `;

  try {
    // 4. Call the AI using the new ai.models.generateContent method
    const response = await ai.models.generateContent({
        // Use the recommended 'gemini-2.5-flash' model instead of the prohibited 'gemini-1.5-flash'.
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

  } catch (error: any) {
    console.error('Error calling Gemini API:', error);
    if (error instanceof SyntaxError) {
      throw new Error('Failed to parse the response from the AI. The AI may have returned an invalid JSON format.');
    }
     // Propagate the actual error message if available
    const message = error.message || 'An unexpected error occurred while generating the campaign.';
    throw new Error(message);
  }
};