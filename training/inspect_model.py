"""
Script to inspect the existing model architecture.
This helps verify the training code matches the deployed model.
"""

import tensorflow as tf
from tensorflow import keras
import os

def inspect_model(model_path='distractedDrivingModel'):
    """Load and inspect the model architecture."""
    
    if not os.path.exists(model_path):
        print(f"Model not found at '{model_path}'")
        print("Looking for saved_model.pb...")
        if os.path.exists('saved_model.pb'):
            print("Found saved_model.pb. The model might be in a different format.")
            print("Try loading with: model = keras.models.load_model('distractedDrivingModel')")
        return None
    
    try:
        print(f"Loading model from '{model_path}'...")
        model = keras.models.load_model(model_path)
        
        print("\n" + "="*60)
        print("MODEL ARCHITECTURE")
        print("="*60)
        model.summary()
        
        print("\n" + "="*60)
        print("MODEL CONFIGURATION")
        print("="*60)
        print(f"Input shape: {model.input_shape}")
        print(f"Output shape: {model.output_shape}")
        print(f"Number of layers: {len(model.layers)}")
        
        print("\n" + "="*60)
        print("LAYER DETAILS")
        print("="*60)
        for i, layer in enumerate(model.layers):
            print(f"\nLayer {i}: {layer.name}")
            print(f"  Type: {type(layer).__name__}")
            if hasattr(layer, 'filters'):
                print(f"  Filters: {layer.filters}")
            if hasattr(layer, 'kernel_size'):
                print(f"  Kernel size: {layer.kernel_size}")
            if hasattr(layer, 'rate'):
                print(f"  Dropout rate: {layer.rate}")
            if hasattr(layer, 'pool_size'):
                print(f"  Pool size: {layer.pool_size}")
            if hasattr(layer, 'units'):
                print(f"  Units: {layer.units}")
            print(f"  Output shape: {layer.output_shape}")
        
        print("\n" + "="*60)
        print("MODEL WEIGHTS")
        print("="*60)
        total_params = model.count_params()
        trainable_params = sum([tf.keras.backend.count_params(w) for w in model.trainable_weights])
        non_trainable_params = total_params - trainable_params
        
        print(f"Total parameters: {total_params:,}")
        print(f"Trainable parameters: {trainable_params:,}")
        print(f"Non-trainable parameters: {non_trainable_params:,}")
        
        return model
        
    except Exception as e:
        print(f"Error loading model: {e}")
        return None

if __name__ == '__main__':
    # Try different possible model paths
    model_paths = [
        'distractedDrivingModel',
        './distractedDrivingModel',
        'saved_model.pb'
    ]
    
    model = None
    for path in model_paths:
        if os.path.exists(path):
            model = inspect_model(path)
            break
    
    if model is None:
        print("\nCould not find model. Make sure the model files are in the current directory.")
        print("Expected: 'distractedDrivingModel' directory or 'saved_model.pb' file")
