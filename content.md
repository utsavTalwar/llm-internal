# How LLMs Work Internally

> Interactive Guide — From raw text to predicted tokens — a visual walkthrough

---

## 01 · Tokenization — Breaking Text into Tokens

Before anything happens, the AI has to convert your words into numbers — because computers only understand math. It chops your sentence into small pieces called tokens (think of them like puzzle pieces), then assigns each one a number. A token can be a whole word, part of a word, or even just punctuation.

### Interactive Demo

- **Input sentence:** "The quick brown fox"
- Tokens are highlighted to show how the sentence is split

---

### Go Deeper

#### How Byte-Pair Encoding (BPE) works

Most AI models don't split text by whole words or single letters — they use a smarter approach called Byte-Pair Encoding (BPE). Think of it like finding shortcuts in a language.

It starts by treating every character as its own piece. Then it repeatedly finds the two pieces that appear next to each other most often, and merges them into one. After thousands of these merges, common words like "the" or "is" become a single token, while unusual words get broken into recognizable chunks — "unbelievable" might become "un" + "believ" + "able".

This is why models can handle words they've technically never seen before — they just break them into familiar parts. It also works well across different languages and even code.

#### Vocabulary size and what it costs

Every model has a fixed list of tokens it knows — called its vocabulary. GPT-4 knows about 100,000 tokens. BERT knows around 30,000. Choosing the right size involves real trade-offs:

A larger vocabulary means common phrases become single tokens, so sentences are shorter in token-count — the model can fit more content into its working memory (called the context window). But storing a huge vocabulary takes more memory.

A smaller vocabulary splits words into more pieces, making sentences longer in token-count — which uses up the context window faster. This is why non-English speakers sometimes feel AI understands them less well: their language uses more tokens per idea.

#### Special tokens — hidden control signals

Not all tokens come from your words. Tokenizers include special reserved tokens that act like stage directions — invisible to you but meaningful to the model.

For example: `<|system|>` tells the model "what follows are your instructions", `<|user|>` marks your message, and `<|assistant|>` marks where the model's reply begins. The model learned during training to treat these as authoritative boundaries.

This is why AI assistants can maintain a persona — the system prompt is wrapped in special tokens before your conversation even starts. `<|endoftext|>` signals that a document is finished, stopping the model from rambling.

#### Surprising ways tokenization goes wrong

Because the model sees tokens, not raw text, tokenization creates some genuinely weird failure modes that trip up even experienced users.

Numbers are a classic example: the model sees "9.11" as three character tokens — "9", ".", "11". It has no concept that 9.11 is numerically larger than 9.9. This is a real reason why AI models sometimes struggle with basic arithmetic.

Non-English languages like Hindi, Arabic, or Chinese often use 3–5× more tokens per sentence than English for the same meaning — so users of those languages get less "thinking space" within the same context window limit.

Even spacing matters: "cat" and " cat" (with a leading space) can be different tokens entirely.

---

## 02 · Embedding — Giving Numbers Meaning

A raw number like 4996 doesn't carry any meaning. So each token number gets swapped for a list of hundreds of decimal numbers called a vector (or embedding). Think of it as a coordinate in a map of meaning — words with similar meanings land close together. "King" and "Queen" are neighbours; "Apple" is far away.

### Interactive Demo

- Each token maps to a vector. Hover to inspect — notice King & Queen cluster together.
- Words displayed: **King**, **Queen**, **Man**, **Woman**, **Apple**
- King − Man + Woman ≈ Queen (famous analogy in embedding space)

---

### Go Deeper

#### How the model learns what words mean

Embeddings — the lists of numbers assigned to each token — are not written by hand. The model figures them out entirely on its own, by reading billions of sentences.

Here's the key idea: words that appear in similar situations end up with similar numbers. The model notices that "King" and "Queen" keep appearing near the same words (throne, crown, palace, ruled) — so their vectors drift close together during training. Nobody told it they're related; it learned this purely from patterns.

This process, called backpropagation, nudges every vector slightly after each training example. Over billions of examples, the geometry of meaning emerges on its own.

#### How the model knows word order

Here's something easy to miss: the attention mechanism on its own treats a sentence as a bag of words. It doesn't automatically know that "dog bit man" and "man bit dog" are different — both have the same three words.

To fix this, the model adds a positional encoding to each token's embedding before any processing begins. Think of it as stamping each word with its position number, baked into the vector itself.

Early models used a fixed mathematical formula (sinusoidal functions) for this. Modern models like LLaMA and GPT-4 use a technique called RoPE (Rotary Position Embedding), which handles much longer texts without losing track of order.

#### Meaning as a map — the geometry of embeddings

One of the most striking things about well-trained embeddings is that meaning becomes geometric. Relationships between words become directions you can navigate in the embedding space.

The famous example: if you take the vector for "King", subtract "Man", and add "Woman", you land very close to the vector for "Queen". Royalty and gender turn out to be nearly independent directions in this space.

In practice, this geometry powers semantic search (finding documents by meaning, not keywords), recommendation systems, and even cross-language translation — where French and English embeddings for the same concept often differ by just a constant offset vector.

#### Size matters — embedding dimensions

The length of each embedding vector — called its dimensionality — is a core design choice. Bigger models use higher-dimensional vectors:

BERT-base uses 768 dimensions per token. GPT-3 uses 12,288. LLaMA 3 (70B) uses 8,192. More dimensions give the model more "room" to store subtle distinctions in meaning, but every extra dimension multiplies the computation needed in every single layer.

The embedding table alone can be enormous: 100,000 tokens × 8,192 dimensions = 800 million numbers, just to store the lookup table before any processing happens.

---

## 03 · Attention — Understanding Context

Words mean different things depending on what's around them — "bank" next to "river" vs "bank" next to "money". The attention mechanism lets every word look at every other word in the sentence and decide which ones are most relevant to understanding it. This is the heart of modern AI language models.

### Interactive Demo

- Click a word — see how much attention it pays to every other word.
- Words: **The**, **cat**, **sat**, **on**, **mat**
- Attention weights are displayed as percentages from the selected word.
- In practice, there are multiple attention heads running in parallel — each learning different relationship patterns (syntax, coreference, proximity…).

---

### Go Deeper

#### Query, Key, Value — how attention works

The terms Query (Q), Key (K), and Value (V) sound technical, but the idea is surprisingly intuitive — it's a lot like how a search engine works.

Imagine you're searching for something: your search phrase is the Query. Each webpage has a title that summarises what it's about — that's the Key. The actual content of the page is the Value.

In self-attention, every single word in a sentence acts as all three at once. As a Query it asks "who should I pay attention to?" As a Key it announces "here's what I'm about." As a Value it says "here's what I'll contribute if chosen." The model learns these roles from data — they're not hand-designed.

#### What attention weights actually look like

Once the model computes how relevant each word is to every other word, it produces attention weights — a number between 0 and 1 for each pair, representing how much one word should "listen to" another.

The computation: multiply Q by K (a dot product, which measures similarity), scale it down to keep numbers manageable, then run softmax to turn the scores into probabilities that sum to 1. These probabilities weight the Values, producing a new, context-aware representation of each token.

Researchers who study these weights have found fascinating patterns — in some models, certain attention heads specialize in tracking subject-verb agreement, others track which pronoun refers to which noun.

#### Multiple attention heads — seeing many things at once

A single round of attention can only learn one kind of relationship at a time. But language has many simultaneous structure types — a word relates to its subject, to nearby words, to the pronoun it refers to, all at once.

Multi-head attention runs several independent attention operations in parallel — each called a "head". Each head has its own set of learned Q/K/V weights, so each can specialize in a different kind of relationship. Their outputs are then combined.

GPT-2 (the small, early version) uses 12 heads per layer. GPT-3 uses 96 heads. Researchers studying individual heads have found some that reliably track coreference ("it" → the noun it refers to) and others that track syntactic dependencies.

#### Why longer conversations are expensive

Attention has a fundamental cost: every token must compare itself to every other token. For a sequence of n tokens, that's n² comparisons. Double the length, quadruple the compute.

With 1,000 tokens you have 1 million comparisons. With 100,000 tokens (a long document), you have 10 billion. This is called O(n²) complexity, and it's why early models like GPT-2 had a 1,024 token limit.

Getting to the long context windows in modern models (GPT-4o: 128k tokens, Claude: 200k tokens) required major research breakthroughs — like Flash Attention, which cleverly reorders the computation to use memory more efficiently.

---

## 04 · Transformer Layers — Thinking Deeper, Step by Step

Attention + a small neural network are stacked on top of each other dozens or even hundreds of times. Each pass refines the model's understanding — early layers pick up basic grammar, middle layers understand meaning, and the deepest layers handle complex reasoning. GPT-4 has 96 of these stacked layers.

### Interactive Demo

Click any layer group to see what it learns:

| Layer Group | Focus | What it learns |
|---|---|---|
| Layer 1–4 | Surface patterns | Punctuation, capitalization, adjacent word pairs |
| Layer 5–16 | Syntax & structure | POS tagging, phrase boundaries, dependency arcs |
| Layer 17–40 | Semantics | Named entities, coreference, word sense disambiguation |
| Layer 41–80 | Reasoning & context | Multi-hop inference, long-range dependencies, world knowledge |
| Layer 81–96 | Task-specific | Format, style, instruction following, output planning |

Each layer = Multi-Head Attention → Add & Norm → Feed-Forward Network → Add & Norm

---

### Go Deeper

#### Skip connections — how deep networks actually learn

If you stack 96 layers of transformations, there's a serious problem: during training, the error signal (called the gradient) has to travel backward through all 96 layers to update the early ones. It tends to shrink to almost nothing on the way — a problem called vanishing gradients.

Residual connections (also called skip connections) solve this with a simple trick: instead of passing the output of a layer to the next, you add the layer's output to its own input. The formula is: output = x + f(x). This gives the gradient a direct highway back through the network, bypassing any layer that isn't helping.

This idea, popularized by Microsoft's ResNet in 2015, is now used in virtually every deep neural network — including every large language model.

#### Layer normalization — keeping signals stable

As a signal passes through dozens of layers, the numbers can drift wildly — some exploding to huge values, others shrinking to near-zero. This makes training unstable and slow.

Layer Normalization fixes this by rescaling the numbers at each step: it adjusts them so they always have roughly the same average (near zero) and spread (near one). Think of it like auto-leveling the volume so the signal stays in a usable range.

Unlike an older technique called Batch Normalization, Layer Norm works on each token independently, which makes it well-suited for text where sentences have different lengths. Modern models like LLaMA use a simplified version called RMSNorm, which is about 10% faster.

#### The feed-forward network — where facts are stored

After attention mixes information across the whole sentence, each word independently passes through a small two-layer neural network called the Feed-Forward Network (FFN). This happens the same way for every position.

The FFN first expands the vector to four times its size (e.g., 8,192 → 32,768), applies a non-linear activation function (usually GeLU or SiLU), then compresses it back down.

Recent research suggests this is where the model stores factual knowledge — like knowing that Paris is the capital of France. When you ask a factual question, the answer likely comes from the FFN weights, not from re-reading your prompt. FFN layers account for roughly two-thirds of all parameters in a typical transformer.

#### Scaling laws — bigger really is better (so far)

In 2020, researchers at OpenAI published a landmark finding: model quality follows smooth, predictable mathematical curves as you scale up parameters, data, and compute. More of any of the three = reliably better performance. No ceiling has been found yet.

But something stranger also happens: certain abilities appear suddenly at size thresholds — these are called emergent abilities. Few-shot learning (solving tasks from examples in the prompt) appeared around 10 billion parameters. Chain-of-thought reasoning (thinking step by step) emerged around 50 billion.

This is why the jump from GPT-2 to GPT-3 felt almost like a different kind of system — not just "a bit better", but capable of things the smaller model simply couldn't do.

---

## 05 · Architecture — Three Ways to Wire a Transformer

Think of it like reading vs. writing. Some models are built only to read and understand (like BERT). Others are built only to write, one word at a time (like GPT and Claude). A third type reads first, then writes — useful for tasks like translation. The design choice shapes everything the model can and can't do.

### Interactive Demo

#### Reader (e.g. BERT, RoBERTa) — Understanding text

Sees everything at once — like reading a full sentence before answering.

Imagine reading an entire paragraph before answering a question about it. This model sees all words simultaneously and builds a deep understanding of the input — but it doesn't write new text. It's great at tasks like "Is this review positive or negative?" or "Find the person's name in this sentence."

**Use cases:** Spam detection · Sentiment analysis · Search & retrieval · Classifying text

#### Writer (e.g. GPT, Claude, Llama) — Generating text

Writes left-to-right — each word only sees what came before it.

Like writing a sentence one word at a time, where you can only look back at what you've already written — never peek ahead. This is how ChatGPT, Claude, and most AI assistants work. They predict the next word, then the next, then the next, building up a response.

**Use cases:** Chatbots & assistants · Writing & summarizing · Code generation · Creative content

#### Reader → Writer (e.g. T5, BART, Whisper) — Transform input → output

First reads everything, then writes based on what it understood.

Like a translator who first reads the full French sentence to understand it, then writes the English translation word by word. The "reader" half digests the input completely, then the "writer" half produces the output — constantly referring back to what was read.

**Use cases:** Translation · Summarization · Speech-to-text · Question answering

#### Encoder–Decoder Diagram

- **Encoder:** Bonjour Paris → Bidirectional Attention → Context vectors
- **Decoder:** Hello Paris → Causal Attention → Cross-Attention ← (from encoder) → Output tokens

#### Attention visibility grid

Rows = current word · Columns = words it can look at (✓ can see, ✗ cannot see)

---

### Go Deeper

#### How the model trains efficiently — causal masking

You might wonder: if the model generates text one word at a time, does training also work one word at a time? That would be painfully slow.

The clever solution is called teacher forcing with a causal mask. During training, the model sees the entire correct sentence at once — but it's shown a mask that hides all future words. So for each position, it can only see the words that came before it. This lets it practice predicting every word in the sentence simultaneously, in a single forward pass.

One training example therefore gives n separate learning signals — one per word. This is why training is feasible even though the model generates text sequentially at inference time.

#### Cross-attention — the decoder reading the encoder

In models that have both an encoder and a decoder (like translation models), the two halves need a way to communicate. That bridge is called cross-attention.

In cross-attention, the decoder's current position generates the Query ("what am I looking for?"), but the Keys and Values come entirely from the encoder's output ("here's everything I understood about the input").

So when translating "The black cat" into French, as the decoder is writing "noir" (black), it might be attending strongly back to "black" in the encoded English. The decoder always has full access to the encoder's understanding, at every step of generation.

#### From a text predictor to an assistant — RLHF

A model trained only on raw text is good at continuing text — but it doesn't know how to be helpful, honest, or safe. It would happily complete "How do I make a bomb" with an actual answer.

The transformation into a useful assistant happens through a process called RLHF — Reinforcement Learning from Human Feedback. Here's the simplified version:

First, human trainers write examples of good assistant behaviour (Supervised Fine-Tuning, or SFT). Then, a separate model is trained to score responses based on human preference ratings — this is the Reward Model. Finally, the assistant is further trained using reinforcement learning (PPO or GRPO) to produce responses the reward model scores highly.

This is what separates GPT-4-base (a raw text predictor) from ChatGPT (a helpful assistant).

#### Why almost every frontier AI today is decoder-only

The original 2017 Transformer paper used an encoder-decoder for translation. By 2023, virtually every leading AI — GPT-4, Claude, Gemini, LLaMA — is decoder-only. Why did encoder-decoder fall out of fashion?

Decoder-only models have one huge advantage: they can be pre-trained on any raw text, just by predicting the next word. No labelled data, no paired examples needed — just internet text. This makes them extremely cheap to train at scale.

They're also surprisingly versatile. With the right prompt, a decoder-only model can classify, translate, summarise, and generate — all without changing the weights. Encoder-only models (like BERT) still dominate tasks where you only need to understand text, not generate it — like search ranking and spam detection.

---

## 06 · Output — Choosing the Next Word

At every step, the model looks at everything it has written so far and produces a ranked list of every word it knows, with a score for each. It picks one word, adds it to the sentence, and repeats — that's how "The capital of France is" becomes "The capital of France is Paris." One word at a time, from start to finish.

### Interactive Demo

**Prompt:** "The capital of France is ___"

Top next-token predictions (adjust temperature to see its effect):

| Token | Probability |
|---|---|
| Paris | ~72% |
| London | ~14% |
| France | ~8% |
| Rome | ~4% |
| Berlin | ~2% |

**Temperature** controls randomness:
- **< 0.5** — Very deterministic
- **0.5–0.9** — Focused
- **1.0** — Balanced
- **> 1.0** — Creative / random

This sampling repeats token by token until an end-of-sequence token or max length is reached. The whole response is generated autoregressively.

---

### Go Deeper

#### From the last layer to a ranked list of words

After the final transformer layer, each position has a rich vector summarising everything the model understood. For generation, only the very last position's vector matters — it has "read" all the previous tokens.

This vector gets multiplied by the embedding table in reverse: the result is a raw score for every single word in the vocabulary (all 100,000 of them). These raw scores are called logits — they can be any positive or negative number.

The logits are then fed through a softmax function, which converts them into proper probabilities that all add up to 1. The model now has a ranked probability distribution over its entire vocabulary — and picks one word from it.

#### How the model actually picks the next word

You might assume the model always picks the most probable word. It doesn't — that leads to repetitive, predictable text. Most modern AI uses smarter sampling strategies.

Greedy decoding always picks the top word — fast, but tends to loop ("The cat sat on the mat. The cat sat on the mat...").

Top-k sampling narrows the choice to the k most likely words and samples randomly from those. If k=50, you always pick from the top 50 — avoiding bizarre words while keeping variety.

Top-p sampling (also called nucleus sampling) picks the smallest set of words whose probabilities add up to at least p (e.g. 90%). When the model is very confident, this might be just 2–3 words. When unsure, it might include 50. Most production systems like ChatGPT use top-p.

#### What temperature actually controls

Temperature is a number you can set before the softmax step. It divides all the logits — the raw scores — before they're converted to probabilities.

A low temperature (e.g. 0.3) makes the gap between scores bigger, so the highest-scoring word becomes overwhelmingly likely. The model becomes more confident and deterministic.

A high temperature (e.g. 1.5) compresses the gap, making all words more equally likely. The model becomes more exploratory and surprising.

Crucially: temperature doesn't change what the model knows. A high-temperature model isn't smarter or more creative — it just takes more risks. The knowledge inside stays the same; you're just adjusting how boldly it acts on that knowledge.

#### How the model learned all of this — training

The entire model — billions of parameters — was learned from a single surprisingly simple task: given a sequence of text, predict the next word.

For each training example, the model makes a prediction, and the actual next word is revealed. A loss function (called cross-entropy) measures how wrong the prediction was — the lower the probability assigned to the correct word, the higher the loss. This loss is then used to nudge every parameter in the network very slightly in the right direction, through a process called backpropagation.

Repeat this across trillions of words, and the model gradually internalises grammar, facts, reasoning patterns, and style — not because anyone programmed it to, but because all of that structure is needed to predict text well.
