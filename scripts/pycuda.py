import pycuda.driver as cuda
import pycuda.autoinit
import numpy as np
from pycuda.compiler import SourceModule

# Define a CUDA kernel
mod = SourceModule("""
    __global__ void square(float *a, float *b) {
        int idx = threadIdx.x + threadIdx.y*4;
        b[idx] = a[idx] * a[idx];
    }
""")

# Example usage
a = np.array([1, 2, 3, 4, 5], dtype=np.float32)
b = np.zeros_like(a, dtype=np.float32)

# Allocate memory on the GPU
a_gpu = cuda.mem_alloc(a.nbytes)
b_gpu = cuda.mem_alloc(b.nbytes)

# Transfer data to the GPU
cuda.memcpy_htod(a_gpu, a)

# Get the function from the module
func = mod.get_function("square")

# Set block and grid sizes
block_size = (1, 1, 1)
grid_size = (a.shape[0], 1, 1)

# Call the kernel
func(a_gpu, b_gpu, block=block_size, grid=grid_size)

# Transfer data back to the CPU
cuda.memcpy_dtoh(b, b_gpu)

print(b)