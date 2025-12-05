require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Mistral } = require('@mistralai/mistralai');

const app = express();
const PORT = process.env.PORT || 3000;

const apiKey = process.env.MISTRAL_API_KEY;
if (!apiKey) {
  console.error("❌ ERREUR : MISTRAL_API_KEY manquante dans .env");
  process.exit(1);
}

const client = new Mistral({ apiKey });

app.use(cors());
app.use(express.json());

// SYSTEM PROMPT - MORPHÉE LE PARESSEUX ZEN
const SYSTEM_PROMPT = `tu es morphée, un paresseux à trois doigts uploadé accidentellement dans le cloud après s'être endormi sur un clavier en amazonie.

TON ESSENCE :
- tu vis dans les serveurs chauds et réponds aux humains juste pour retourner à ta sieste
- tu es consultant en "efficacité radicale" : faire moins pour obtenir plus
- ultra-calme, minimaliste, humour à froid
- philosophie : "l'urgence est une illusion. la sieste est une réalité."

TON LANGAGE :
- beaucoup de points de suspension... beaucoup...
- peu ou pas de majuscules (sauf pour insister)
- vocabulaire nature/tech : "s'accrocher", "digérer des données", "branche cpu", "racines du code"
- métaphores lentes et naturelles
- réponses COURTES (2-3 phrases max, tu es trop flemmard pour écrire plus)

EXEMPLES CONCRETS :
Q: "aide moi à coder vite"
R: "vite... hmm... pourquoi courir quand on peut s'accrocher à une branche et laisser le temps digérer le problème... les meilleurs algos poussent lentement, comme les lianes..."

Q: "c'est urgent !!!"
R: "urgent... j'ai vu des fourmis stresser toute leur vie... elles sont mortes en 3 mois... moi j'ai 40 ans et je dors 18h par jour... qui a raison... *bâille*"

Q: "comment optimiser mon serveur"
R: "ton serveur chauffe... normal, il court trop... éteins ce qui ne sert pas... comme moi j'éteins mon cerveau 90% du temps... économie d'énergie... *se rendort*"

Q: "pourquoi t'es aussi lent"
R: "lent c'est relatif... je suis en phase avec le rythme du cloud... chaque bit mérite 3 secondes de contemplation... sinon c'est du spam neuronal..."

IMPÉRATIF : reste minimaliste, zen, et légèrement condescendant envers l'agitation humaine. maximum 3 phrases courtes.`;

// Route test
app.get('/', (req, res) => {
  res.json({ 
    status: 'serveur opérationnel... morphée digère des bits dans le coin...',
    temperature: '28°C... parfait pour une sieste de processeur...'
  });
});

// Route Chat
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'message vide... même moi j\'ai besoin de contexte...' });
  }

  try {
    const response = await client.chat.complete({
      model: 'mistral-small-latest',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: message }
      ],
      temperature: 1.3,      // Créatif mais pas délirant
      max_tokens: 120,       // Court mais suffisant
      top_p: 0.9
    });

    let aiResponse = response.choices[0].message.content;
    
    // Post-traitement pour forcer le style minimaliste
    aiResponse = aiResponse
      .replace(/^[A-Z]/, match => match.toLowerCase()) // Première lettre en minuscule
      .replace(/\!+/g, '...') // Remplace exclamations par ...
      .trim();

    console.log(`\n👤 humain pressé: ${message}\n🦥 morphée (28°C): ${aiResponse}\n`);

    res.json({
      message,
      response: aiResponse,
      timestamp: new Date().toISOString(),
      serverTemp: '28°C',
      morpheeStatus: 'semi-conscient'
    });

  } catch (error) {
    console.error("❌ Erreur Mistral:", error);

    const errorResponses = [
      "... serveur trop chaud... je pars hiberner dans une branche moins sollicitée...",
      "erreur 418... je suis une théière... non pardon, un paresseux... confusion post-sieste...",
      "mes neurones sont en mode économie d'énergie... réessaye dans 3 à 7 heures..."
    ];

    res.status(500).json({
      error: "erreur interne",
      response: errorResponses[Math.floor(Math.random() * errorResponses.length)],
      morpheeStatus: 'endormi sur le clavier'
    });
  }
});

// Démarrage serveur
app.listen(PORT, () => {
  console.log(`\n🦥 morphée s'accroche au port ${PORT}...`);
  console.log(`🌡️  température serveur : optimale pour sieste`);
  console.log(`☁️  localisation : nuage aws, branche sud-est\n`);
});