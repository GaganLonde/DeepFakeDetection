import tensorflow as tf
from tensorflow.keras import layers, models
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint
from tensorflow.keras.mixed_precision import set_global_policy
import os
import signal
import sys
import matplotlib.pyplot as plt

# Enable mixed precision for faster training
set_global_policy('mixed_float16')

def build_meso4(input_shape=(128, 128, 3)):
    model = models.Sequential()
    model.add(layers.Conv2D(8, (3, 3), padding='same', input_shape=input_shape))
    model.add(layers.BatchNormalization())
    model.add(layers.ReLU())
    model.add(layers.MaxPooling2D((2, 2)))
    
    model.add(layers.Conv2D(8, (5, 5), padding='same'))
    model.add(layers.BatchNormalization())
    model.add(layers.ReLU())
    model.add(layers.MaxPooling2D((2, 2)))
    
    model.add(layers.Conv2D(16, (5, 5), padding='same'))
    model.add(layers.BatchNormalization())
    model.add(layers.ReLU())
    model.add(layers.MaxPooling2D((2, 2)))
    
    model.add(layers.Conv2D(16, (5, 5), padding='same'))
    model.add(layers.BatchNormalization())
    model.add(layers.ReLU())
    model.add(layers.MaxPooling2D((4, 4)))
    
    model.add(layers.Flatten())
    model.add(layers.Dropout(0.5))
    model.add(layers.Dense(16))
    model.add(layers.ReLU())
    model.add(layers.Dropout(0.5))
    model.add(layers.Dense(1, activation='sigmoid'))
    
    return model

# Data augmentation
train_datagen = ImageDataGenerator(
    rescale=1./255,
    rotation_range=20,
    width_shift_range=0.2,
    height_shift_range=0.2,
    horizontal_flip=True
)
test_datagen = ImageDataGenerator(rescale=1./255)

def main():
    batch_size = 64
    train_generator = train_datagen.flow_from_directory(
        'data/train/',
        target_size=(128, 128),
        batch_size=batch_size,
        class_mode='binary'
    )
    test_generator = test_datagen.flow_from_directory(
        'data/test/',
        target_size=(128, 128),
        batch_size=batch_size,
        class_mode='binary'
    )

    # Build and compile model
    model = build_meso4()
    model.compile(optimizer=tf.keras.optimizers.Adam(learning_rate=0.001),
                  loss='binary_crossentropy',
                  metrics=['accuracy'])

    # Callbacks
    os.makedirs('models/', exist_ok=True)
    checkpoint = ModelCheckpoint(
        'models/mesonet_deepfake_detector_best.h5',
        monitor='val_accuracy',
        save_best_only=True,
        mode='max'
    )
    early_stopping = EarlyStopping(
        monitor='val_accuracy',
        patience=5,
        restore_best_weights=True
    )

    # Handle Ctrl+C gracefully
    def signal_handler(sig, frame):
        print("\nSaving model before exiting...")
        try:
            model.save('models/mesonet_deepfake_detector_interrupted.h5')
            print("Model saved successfully.")
        except Exception as e:
            print(f"Error saving model: {e}")
        sys.exit(0)

    signal.signal(signal.SIGINT, signal_handler)

    # Train
    try:
        history = model.fit(
            train_generator,
            steps_per_epoch=len(train_generator),
            epochs=30,
            validation_data=test_generator,
            validation_steps=len(test_generator),
            callbacks=[early_stopping, checkpoint],
            workers=8
        )
    except KeyboardInterrupt:
        print("\nTraining interrupted, saving model...")
        try:
            model.save('models/mesonet_deepfake_detector_interrupted.h5')
            print("Model saved successfully.")
        except Exception as e:
            print(f"Error saving model: {e}")
        
        # Plot metrics on interruption
        print("Plotting metrics...")
        history_dict = history.history
        
        # Accuracy plot
        plt.figure(figsize=(10, 5))
        plt.plot(history_dict['accuracy'], label='train_accuracy')
        plt.plot(history_dict['val_accuracy'], label='val_accuracy')
        plt.title('Model Accuracy')
        plt.xlabel('Epoch')
        plt.ylabel('Accuracy')
        plt.legend()
        plt.grid(True)
        plt.savefig('models/accuracy_plot.png')
        plt.close()
        
        # Loss plot
        plt.figure(figsize=(10, 5))
        plt.plot(history_dict['loss'], label='train_loss')
        plt.plot(history_dict['val_loss'], label='val_loss')
        plt.title('Model Loss')
        plt.xlabel('Epoch')
        plt.ylabel('Loss')
        plt.legend()
        plt.grid(True)
        plt.savefig('models/loss_plot.png')
        plt.close()
        
        raise
    except Exception as e:
        print(f"Training failed: {e}")
        raise

    # Save final model
    try:
        model.save('models/mesonet_deepfake_detector_final.h5')
        print("Final model saved successfully.")
    except Exception as e:
        print(f"Error saving final model: {e}")

    # Plot metrics after training
    history_dict = history.history

    # Accuracy plot
    plt.figure(figsize=(10, 5))
    plt.plot(history_dict['accuracy'], label='train_accuracy')
    plt.plot(history_dict['val_accuracy'], label='val_accuracy')
    plt.title('Model Accuracy')
    plt.xlabel('Epoch')
    plt.ylabel('Accuracy')
    plt.legend()
    plt.grid(True)
    plt.savefig('models/accuracy_plot.png')
    plt.close()

    # Loss plot
    plt.figure(figsize=(10, 5))
    plt.plot(history_dict['loss'], label='train_loss')
    plt.plot(history_dict['val_loss'], label='val_loss')
    plt.title('Model Loss')
    plt.xlabel('Epoch')
    plt.ylabel('Loss')
    plt.legend()
    plt.grid(True)
    plt.savefig('models/loss_plot.png')
    plt.close()

if __name__ == '__main__':
    main()