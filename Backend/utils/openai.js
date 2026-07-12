import "dotenv/config";

const getOpenAIAPIResponse = async (message) => {
  const apiKey = process.env.OPENAI_API_KEY?.trim();

  console.log("API key loaded:", apiKey ? "YES" : "NO");
  console.log("API key starts correctly:", apiKey?.startsWith("sk-or-v1-"));
  console.log("API key length:", apiKey?.length);

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
          "HTTP-Referer": "http://localhost:5173",
          "X-Title": "SigmaGPT"
        },

        body: JSON.stringify({
          model: "openai/gpt-4o-mini",
          messages: [
            {
              role: "user",
              content: message
            }
          ]
        })
      }
    );

    const data = await response.json();

    console.log("OpenRouter status:", response.status);

    if (!response.ok) {
      console.error("OpenRouter API Error:", data);

      throw new Error(
        data?.error?.message || "Failed to get response from OpenRouter"
      );
    }

    return data.choices[0].message.content;

  } catch (err) {
    console.error("Error calling OpenRouter:", err.message);
    throw err;
  }
};

export default getOpenAIAPIResponse;