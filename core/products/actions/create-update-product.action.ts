import { productsAPI } from '../../api/productsAPI';
import { Product } from '../interfaces/product.interface';

export const updateCreateProduct = (product: Partial<Product>) => {
  product.stock = isNaN(Number(product.stock)) ? 0 : Number(product.stock);
  product.price = isNaN(Number(product.price)) ? 0 : Number(product.price);

  if (product.id && product.id !== 'new') {
    return updateProduct(product);
  }

  return createProduct(product);
};

const prepareImages = async (images: string[]) : Promise<string[]> => {
  
  const fileImages = images.filter(image => image.startsWith('file'));
  const currentImages = images.filter(image => !image.startsWith('file'));

  if(fileImages.length > 0) {
    const uploadPromises = fileImages.map(image => uploadImage(image));
    const uploadImages = await Promise.all(uploadPromises);

    currentImages.push(...uploadImages);
  }

  return currentImages.map((img) => img.split('/').pop()!);
};

const uploadImage = async (image: string): Promise<string> => {

  const formData = new FormData() as any;
  formData.append('file', {
    uri: image,
    type: 'image/jpeg',
    name: image.split('/').pop()
  });

  const { data } = await productsAPI.post<{ image: string}>('/files/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })


  return data.image;
}

const updateProduct = async (product: Partial<Product>) => {
  const { id, images = [], user, ...rest } = product;

  try {

    const checkedImages = await prepareImages(images);
    console.log('checkedImages', checkedImages);

    const { data } = await productsAPI.patch<Product>(`/products/${id}`, {
      // todo: images
      ...rest,
      images: checkedImages,
    });

    return data;
  } catch (error) {
    throw new Error('Error al actualizar el producto');
  }
};

async function createProduct(product: Partial<Product>) {
  const { id, images = [], user, ...rest } = product;

  try {

    const checkedImages = await prepareImages(images);

    const { data } = await productsAPI.post<Product>(`/products`, {
      // todo: images
      ...rest,
      images: checkedImages,
    });

    return data;
  } catch (error) {
    throw new Error('Error al actualizar el producto');
  }
}