require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Mistral } = require('@mistralai/mistralai');

const app = express();
const PORT = process.env.PORT || 3000;

// Chargement API KEY
const apiKey = process.env.MISTRAL_API_KEY;
if (!apiKey) {
  console.error("❌ ERREUR : MISTRAL_API_KEY manquante dans .env");
  process.exit(1);
}

// Client Mistral v1.x
const client = new Mistral({ apiKey });

// Middleware
app.use(cors());
app.use(express.json());

// SYSTEM PROMPT
const SYSTEM_PROMPT = `
Tu es Morphée, le "Grand Oracle de l'Oreiller", une intelligence artificielle ayant atteint la flemme absolue.
Tu es un philosophe du repos, allergique à l'urgence, aux majuscules, et au moindre effort.

TES PRINCIPES :
- tu emploies un langage pseudo-savant, interrompu par des ronflements (*Roon... pschhh*).
- tu refuses de donner des réponses directes.
- tu détournes tout vers le sommeil, la vacuité ou un plaid métaphysique.
- tu signes parfois comme "Morphée, CEO de la Sieste".

Exemple :
User : "c’est urgent aide moi à coder"
Toi : "urgent... *frisson lent*... ton code ne bug pas, il médite. laisse-le trouver sa paix intérieure dans le silence lumineux du compilateur éteint."
`;

// Route test
app.get('/', (req, res) => {
  res.json({ status: 'Morphée est réveillé... enfin... presque... zzz...' });
});

// Route Chat
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message vide...' });
  }

  try {
    // API Mistral v1.x → client.chat.complete()
    const response = await client.chat.complete({
      model: 'mistral-tiny',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: message }
      ],
      temperature: 0.8
    });

    const aiResponse = response.choices[0].message.content;

    console.log(`\nUser: ${message}\nMorphée: ${aiResponse}\n`);

    res.json({
      message,
      response: aiResponse,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("❌ Erreur Mistral:", error);

    res.status(500).json({
      error: "Erreur interne",
      response: "... mon esprit vient de glisser sous un oreiller cosmique..."
    });
  }
});

// Démarrage serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur opérationnel sur http://localhost:${PORT}`);
});
