---
layout: Post
title: Real-Time Gender Detection System Using OpenCV and Deep Learning
description: A Python computer vision project that classifies gender from a live webcam feed in real time, using OpenCV for face detection and a trained convolutional neural network for classification.
date: '2024-02-05'
tags:
  - python
  - ai
  - machine-learning
  - computer-vision
  - opencv
images:
  - src: /photos/project-gender-detection.jpg
    alt: Real-time gender detection system built with OpenCV and a convolutional neural network
logo:
  alt: Gender Detection
attributes:
  - label: Role
    value: Solo developer
  - label: Type
    value: Personal project
  - label: Stack
    value: Python, OpenCV, Keras/CNN
---

### Problem

Audience-aware displays and smart-advertisement systems need a way to understand who is actually looking at them, in real time, using nothing more than a standard camera feed. Building that requires two things working together reliably: fast enough face detection to keep up with live video, and a classifier accurate enough to be useful for that.

### Solution

I built a real-time gender detection pipeline in Python: OpenCV's Haar cascade classifier locates faces in each webcam frame, each detected face region is cropped and preprocessed, and a convolutional neural network trained on a labeled face dataset classifies it. The result is displayed as a live overlay on the video feed, frame by frame, so the classification updates continuously as the camera sees new faces.

### Technologies Used

- **Python** for the full pipeline
- **OpenCV** for real-time face detection and webcam frame capture
- **Keras / a convolutional neural network** for the gender classification model
- **NumPy** for image array preprocessing

### Key Features

- Real-time inference directly from a live webcam feed, not just static images
- A dedicated training script (`train.py`) so the classification model can be retrained on a different labeled face dataset
- A separate, versioned model file (`gender_detection.model`) decoupled from the inference script, so the model can be swapped without touching the detection code

### My Contribution

I designed and built the entire pipeline solo: the face-detection preprocessing step, the CNN architecture and training script, and the real-time webcam inference loop that ties them together.

### Source Code

The full source, including the training script and the dataset structure, is available on GitHub:

[View source on GitHub](https://github.com/usamanadeem786/Gender-Detection-master)
