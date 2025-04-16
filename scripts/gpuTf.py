import tensorflow as tf
print("TF version:", tf.__version__)
print("GPU Available: ", tf.config.list_physical_devices('GPU'))
print("GPU Device Name: ", tf.test.gpu_device_name())