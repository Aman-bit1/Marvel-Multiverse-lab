import { NextResponse } from 'next/server';
import { GoogleGenAI, Type } from '@google/genai';

const ai = new GoogleGenAI({});

export async function POST(req: Request) {
  try {
    const { prompt, movieTitle, memoryHistory = [] } = await req.json();

    if (!prompt || !movieTitle) {
      return NextResponse.json({ error: 'Missing prompt or movie' }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: 'GEMINI_API_KEY is missing from environment.' }, { status: 500 });
    }

    // Memory sequence preventing identical plot generation
    const memoryContext = memoryHistory.length > 0 
      ? `\n\nCRITICAL ANTI-REPETITION CONSTRAINT: Do NOT use narrative arcs, endings, or twists similar to these recently generated timelines: ${memoryHistory.join(" | ")}` 
      : "";

    const angles = [
      "Focus on an unexpected betrayal.",
      "Focus on a massive cosmic consequence.",
      "Focus on an emotional, personal sacrifice.",
      "Focus on a technological breakdown.",
      "Focus on a timeline merging anomaly.",
      "Focus on a villain's unexpected redemption.",
      "Focus on a pyrrhic victory.",
      "Focus on a stealth infiltration gone wrong.",
      "Focus on a political/ideological split among heroes."
    ];
    const randomAngle = angles[Math.floor(Math.random() * angles.length)];
    const randomSeed = Math.floor(Math.random() * 1000000);

    const systemPrompt = `You are a master cinematic storyteller mapping a Marvel Cinematic Universe alternate reality.
The user will provide an anchor point movie and a 'What If...' variable.
You must construct a deeply compelling, dramatic, and emotional 3-act storyline.
CRITICAL INSTRUCTIONS:
- Narrative Focus: ${randomAngle}
- Write with cinematic flair, describing visuals implicitly.
- Do NOT repeat the exact plot of the movie.
- Output MUST be structured exactly matching the provided JSON schema.
- Random Seed: ${randomSeed}${memoryContext}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        { role: "user", parts: [{ text: `Anchor Movie: ${movieTitle}\nVariable: ${prompt}` }] }
      ],
      config: {
        systemInstruction: systemPrompt,
        temperature: 1.0, // High variance
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "A dramatic movie-like title, e.g., 'What If... The Shield Shattered'" },
            act1: { type: Type.STRING, description: "Act 1: The Fracture. How the prompt alters the initial events immediately." },
            act2: { type: Type.STRING, description: "Act 2: Escalation. The conflict rises differently due to the change." },
            act3: { type: Type.STRING, description: "Act 3: Resolution. The intense, high-stakes climax." },
            ending: { type: Type.STRING, description: "A deeply emotional or profound final observation of this new reality in one sentence." },
            twist: { type: Type.STRING, description: "A post-credits scene concept that recontextualizes everything." },
            fanTheory: { type: Type.STRING, description: "A one-sentence hook suggesting how this universe connects to the wider MCU multiverse (e.g. 'This anomaly caught the eye of the TVA.')." }
          },
          required: ["title", "act1", "act2", "act3", "ending", "twist", "fanTheory"]
        }
      }
    });

    const resultText = response.text;
    if (!resultText) throw new Error("No response from AI");

    const storyData = JSON.parse(resultText);
    return NextResponse.json(storyData);
    
  } catch (error: any) {
    console.error("Gemini Generation Error:", error);
    return NextResponse.json({ error: error.message || 'Failed to generate reality fracture.' }, { status: 500 });
  }
}
