"""
Training script for SafeDrive Distracted Driving Detection Model

This script trains a CNN model to classify driver distraction states.
Model architecture matches the deployed model exactly.

Categories:
- c0: Safe driving
- c1: Texting - right
- c2: Talking on the phone - right
- c3: Texting - left
- c4: Talking on the phone - left
- c5: Operating the radio
- c6: Drinking
- c7: Reaching behind
- c8: Hair and makeup
- c9: Talking to passenger
"""

import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers, models
from tensorflow.keras.preprocessing.image import ImageDataGenerator
import numpy as np
import os
from pathlib import Path

# Set random seeds for reproducibility
np.random.seed(42)
tf.random.set_seed(42)

# Model parameters
IMG_SIZE = 64
IMG_CHANNELS = 1  # Grayscale
NUM_CLASSES = 10
BATCH_SIZE = 32
EPOCHS = 50

# Data paths (adjust these to your dataset location)
TRAIN_DIR = 'data/train'
VAL_DIR = 'data/val'
TEST_DIR = 'data/test'

def create_model():
    """
    Create the CNN model architecture matching the deployed model.
    
    Architecture:
    - Input: (64, 64, 1) grayscale images
    - Conv2D(32) -> BatchNorm -> Conv2D(32) -> BatchNorm -> MaxPool -> Dropout(0.3)
    - Conv2D(64) -> BatchNorm -> Conv2D(64) -> BatchNorm -> MaxPool -> Dropout(0.3)
    - Flatten -> Dense layers -> Output(10 classes)
    """
    model = models.Sequential([
        # First Conv Block
        layers.Conv2D(32, (3, 3), activation='relu', input_shape=(IMG_SIZE, IMG_SIZE, IMG_CHANNELS)),
        layers.BatchNormalization(),
        layers.Conv2D(32, (3, 3), activation='relu', padding='same'),
        layers.BatchNormalization(),
        layers.MaxPooling2D((2, 2), padding='same'),
        layers.Dropout(0.3),
        
        # Second Conv Block
        layers.Conv2D(64, (3, 3), activation='relu', padding='same'),
        layers.BatchNormalization(),
        layers.Conv2D(64, (3, 3), activation='relu', padding='same'),
        layers.BatchNormalization(),
        layers.MaxPooling2D((2, 2), padding='same'),
        layers.Dropout(0.3),
        
        # Flatten and Dense layers
        layers.Flatten(),
        layers.Dense(128, activation='relu'),
        layers.Dropout(0.5),
        layers.Dense(64, activation='relu'),
        layers.Dropout(0.5),
        layers.Dense(NUM_CLASSES, activation='softmax')
    ])
    
    return model

def compile_model(model):
    """Compile the model with optimizer and loss function."""
    model.compile(
        optimizer=keras.optimizers.Adam(learning_rate=0.001),
        loss='categorical_crossentropy',
        metrics=['accuracy', 'top_k_categorical_accuracy']
    )
    return model

def create_data_generators(train_dir, val_dir, test_dir, batch_size=32):
    """
    Create data generators with augmentation for training.
    
    Training: Includes augmentation (rotation, shifts, zoom, flip)
    Validation/Test: Only rescaling, no augmentation
    """
    # Data augmentation for training
    train_datagen = ImageDataGenerator(
        rescale=1./255,
        rotation_range=15,
        width_shift_range=0.1,
        height_shift_range=0.1,
        zoom_range=0.1,
        horizontal_flip=True,
        fill_mode='nearest'
    )
    
    # Only rescaling for validation and test
    val_test_datagen = ImageDataGenerator(rescale=1./255)
    
    # Create generators
    train_generator = train_datagen.flow_from_directory(
        train_dir,
        target_size=(IMG_SIZE, IMG_SIZE),
        batch_size=batch_size,
        class_mode='categorical',
        color_mode='grayscale',
        shuffle=True
    )
    
    val_generator = val_test_datagen.flow_from_directory(
        val_dir,
        target_size=(IMG_SIZE, IMG_SIZE),
        batch_size=batch_size,
        class_mode='categorical',
        color_mode='grayscale',
        shuffle=False
    )
    
    test_generator = val_test_datagen.flow_from_directory(
        test_dir,
        target_size=(IMG_SIZE, IMG_SIZE),
        batch_size=batch_size,
        class_mode='categorical',
        color_mode='grayscale',
        shuffle=False
    )
    
    return train_generator, val_generator, test_generator

def train_model(model, train_generator, val_generator, epochs=50):
    """Train the model with callbacks."""
    
    # Callbacks
    callbacks = [
        # Early stopping to prevent overfitting
        keras.callbacks.EarlyStopping(
            monitor='val_loss',
            patience=10,
            restore_best_weights=True,
            verbose=1
        ),
        # Reduce learning rate on plateau
        keras.callbacks.ReduceLROnPlateau(
            monitor='val_loss',
            factor=0.5,
            patience=5,
            min_lr=0.00001,
            verbose=1
        ),
        # Model checkpoint
        keras.callbacks.ModelCheckpoint(
            'checkpoints/best_model.h5',
            monitor='val_accuracy',
            save_best_only=True,
            verbose=1
        ),
        # CSV logger
        keras.callbacks.CSVLogger('training_log.csv')
    ]
    
    # Calculate steps per epoch
    steps_per_epoch = train_generator.samples // train_generator.batch_size
    validation_steps = val_generator.samples // val_generator.batch_size
    
    # Train the model
    history = model.fit(
        train_generator,
        steps_per_epoch=steps_per_epoch,
        epochs=epochs,
        validation_data=val_generator,
        validation_steps=validation_steps,
        callbacks=callbacks,
        verbose=1
    )
    
    return history

def evaluate_model(model, test_generator):
    """Evaluate the model on test set."""
    steps = test_generator.samples // test_generator.batch_size
    results = model.evaluate(test_generator, steps=steps, verbose=1)
    
    print(f"\nTest Loss: {results[0]:.4f}")
    print(f"Test Accuracy: {results[1]:.4f}")
    if len(results) > 2:
        print(f"Test Top-K Accuracy: {results[2]:.4f}")
    
    return results

def save_model(model, model_name='distractedDrivingModel'):
    """Save the model in the format expected by the Flask app."""
    # Save as SavedModel format (for TensorFlow/Keras)
    model.save(model_name, save_format='tf')
    print(f"\nModel saved as '{model_name}'")
    
    # Also save as H5 format (backup)
    model.save(f'{model_name}.h5')
    print(f"Model also saved as '{model_name}.h5'")

def print_model_summary(model):
    """Print model architecture summary."""
    print("\n" + "="*50)
    print("MODEL ARCHITECTURE")
    print("="*50)
    model.summary()
    print("="*50 + "\n")

def main():
    """Main training pipeline."""
    print("="*50)
    print("SafeDrive Model Training")
    print("="*50)
    
    # Create necessary directories
    os.makedirs('checkpoints', exist_ok=True)
    os.makedirs('data/train', exist_ok=True)
    os.makedirs('data/val', exist_ok=True)
    os.makedirs('data/test', exist_ok=True)
    
    # Check if data directories exist
    if not os.path.exists(TRAIN_DIR):
        print(f"\nERROR: Training directory '{TRAIN_DIR}' not found!")
        print("Please organize your dataset as follows:")
        print(f"  {TRAIN_DIR}/")
        print("    c0/  (Safe driving)")
        print("    c1/  (Texting - right)")
        print("    c2/  (Talking on the phone - right)")
        print("    c3/  (Texting - left)")
        print("    c4/  (Talking on the phone - left)")
        print("    c5/  (Operating the radio)")
        print("    c6/  (Drinking)")
        print("    c7/  (Reaching behind)")
        print("    c8/  (Hair and makeup)")
        print("    c9/  (Talking to passenger)")
        return
    
    # Create model
    print("\n[1/5] Creating model architecture...")
    model = create_model()
    print_model_summary(model)
    
    # Compile model
    print("\n[2/5] Compiling model...")
    model = compile_model(model)
    
    # Create data generators
    print("\n[3/5] Creating data generators...")
    train_gen, val_gen, test_gen = create_data_generators(
        TRAIN_DIR, VAL_DIR, TEST_DIR, BATCH_SIZE
    )
    
    print(f"\nTraining samples: {train_gen.samples}")
    print(f"Validation samples: {val_gen.samples}")
    print(f"Test samples: {test_gen.samples}")
    print(f"Classes: {train_gen.class_indices}")
    
    # Train model
    print("\n[4/5] Training model...")
    history = train_model(model, train_gen, val_gen, EPOCHS)
    
    # Evaluate model
    print("\n[5/5] Evaluating model on test set...")
    evaluate_model(model, test_gen)
    
    # Save model
    print("\nSaving final model...")
    save_model(model)
    
    print("\n" + "="*50)
    print("Training completed successfully!")
    print("="*50)
    print(f"\nModel saved as 'distractedDrivingModel'")
    print("You can now use this model in app.py")

if __name__ == '__main__':
    main()
