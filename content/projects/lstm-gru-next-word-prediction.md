---
layout: Post
title: LSTM vs GRU Next-Word Prediction for Assistive Communication
description: A deep-learning next-word prediction system trained on the DailyDialog dataset, comparing LSTM and GRU architectures head-to-head with a Streamlit interface — with real, measured results, not estimates.
date: '2026-09-06'
tags:
  - python
  - ai
  - machine-learning
images:
  - src: /photos/project-next-word-prediction.jpg
    alt: LSTM vs GRU next-word prediction system with real experimental results
logo:
  alt: Next-Word Prediction
attributes:
  - label: Role
    value: Solo developer
  - label: Type
    value: Academic / research project
  - label: Stack
    value: TensorFlow, Keras, Streamlit
---

### Problem

Typing can be slow and physically demanding for people who rely on assistive communication technology. A next-word prediction system that suggests likely continuations of a sentence can meaningfully reduce how much someone has to type — but building one requires an actual, measured comparison of model choices, not just picking whichever architecture is more popular.

### Solution

I built a complete next-word prediction pipeline — data cleaning, sentence extraction, tokenization, sequence generation, padding, training, and evaluation — and trained two recurrent architectures, LSTM and GRU, on the DailyDialog conversational dataset under identical conditions, so their results are directly comparable. A Streamlit interface lets you type a partial sentence and see both models' top-K suggestions side by side.

### Technologies Used

- **Python**, **TensorFlow / Keras** for the models and training pipeline
- **Pandas / NumPy** for dataset processing
- **Streamlit** for the interactive prediction interface
- **Matplotlib** for training/evaluation graphs

### Key Features

- A full, reusable preprocessing pipeline: dialogue cleaning, sentence extraction, tokenization, sequence generation, and padding
- Both an LSTM and a GRU language model trained on the same data with the same pipeline
- Saved models, tokenizer, and sequence configuration for reuse without retraining
- A Streamlit app with model selection and top-K next-word suggestions
- Training/evaluation graphs and a side-by-side metrics comparison

### Results

Measured on a held-out test split after training both models to completion:

| Metric | LSTM | GRU |
|---|---:|---:|
| Test Accuracy | 21.78% | 22.36% |
| Test Loss | 4.5958 | 4.4666 |
| Validation Perplexity | 99.25 | 87.23 |
| Training Time | 3.56 hours | 4.05 hours |

GRU came out slightly ahead on both accuracy and perplexity in this run, despite taking longer to train — a useful reminder that "GRU trains faster" is a general tendency, not a guarantee, and it's worth actually measuring both architectures on your own data rather than assuming one wins by default.

### My Contribution

I built the entire pipeline and both models solo — from raw dataset to trained models to the interactive Streamlit interface — and ran the full training and evaluation myself; the results above are the actual output of that run, not estimates.

### Source Code

[View source on GitHub](https://github.com/usamanadeem786/next-word-predition)
