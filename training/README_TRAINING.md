# Model Training Guide

This guide explains how to train the SafeDrive distracted driving detection model.

**Location**: This training code is in the `training/` folder at the project root.

## Model Architecture

The model is a Convolutional Neural Network (CNN) with the following architecture:

- **Input**: 64x64 grayscale images
- **Layers**:
  - Conv2D(32) → BatchNorm → Conv2D(32) → BatchNorm → MaxPool → Dropout(0.3)
  - Conv2D(64) → BatchNorm → Conv2D(64) → BatchNorm → MaxPool → Dropout(0.3)
  - Flatten → Dense(128) → Dropout(0.5) → Dense(64) → Dropout(0.5) → Dense(10)
- **Output**: 10 classes (c0-c9)

## Dataset Structure

Organize your dataset in the following structure:

```
data/
├── train/
│   ├── c0/  (Safe driving images)
│   ├── c1/  (Texting - right images)
│   ├── c2/  (Talking on the phone - right images)
│   ├── c3/  (Texting - left images)
│   ├── c4/  (Talking on the phone - left images)
│   ├── c5/  (Operating the radio images)
│   ├── c6/  (Drinking images)
│   ├── c7/  (Reaching behind images)
│   ├── c8/  (Hair and makeup images)
│   └── c9/  (Talking to passenger images)
├── val/
│   └── (same structure as train/)
└── test/
    └── (same structure as train/)
```

## Installation

1. Navigate to the training directory:
```bash
cd training
```

2. Install required packages:
```bash
pip install -r requirements_training.txt
```

## Training

1. Organize your dataset in the structure above (relative to the training directory)
2. Update paths in `train_model.py` if needed:
   - `TRAIN_DIR`
   - `VAL_DIR`
   - `TEST_DIR`

3. Run the training script:
```bash
cd training
python train_model.py
```

## Training Parameters

- **Image Size**: 64x64 pixels
- **Channels**: 1 (grayscale)
- **Batch Size**: 32
- **Epochs**: 50 (with early stopping)
- **Learning Rate**: 0.001 (with reduction on plateau)
- **Optimizer**: Adam
- **Loss**: Categorical Crossentropy

## Data Augmentation

Training images are augmented with:
- Rotation (±15 degrees)
- Width/Height shifts (±10%)
- Zoom (±10%)
- Horizontal flip

## Output

After training, the model will be saved as:
- `distractedDrivingModel/` - SavedModel format (used by app.py)
- `distractedDrivingModel.h5` - H5 format (backup)
- `checkpoints/best_model.h5` - Best model during training
- `training_log.csv` - Training history

## Model Categories

The model predicts 10 classes:
- **c0**: Safe driving
- **c1**: Texting - right
- **c2**: Talking on the phone - right
- **c3**: Texting - left
- **c4**: Talking on the phone - left
- **c5**: Operating the radio
- **c6**: Drinking
- **c7**: Reaching behind
- **c8**: Hair and makeup
- **c9**: Talking to passenger

## Tips

1. **Dataset Size**: Aim for at least 1000-2000 images per class for good results
2. **Class Balance**: Try to keep classes balanced (similar number of images per class)
3. **Image Quality**: Use clear, well-lit images
4. **Validation**: Use 20% of data for validation, 10% for testing
5. **Early Stopping**: Training will stop early if validation loss doesn't improve for 10 epochs

## Using the Trained Model

Once trained, copy the model to the backend directory:

```bash
# From the training directory
cp -r distractedDrivingModel ../safedrive_backend/
```

Then the model can be used in `safedrive_backend/app.py`:

```python
model = keras.models.load_model('distractedDrivingModel')
```

The model expects:
- Input: 64x64 grayscale image
- Preprocessing: Rescale to [0, 1] (divide by 255)
- Shape: (1, 64, 64, 1) for prediction
