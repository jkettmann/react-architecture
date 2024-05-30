import MediaApi from "./api";
import { dtoToImage } from "./transform";

async function saveImage(file: File, api = MediaApi) {
  const formData = new FormData();
  formData.append("image", file);
  const { data: imageDto } = await api.uploadImage(formData);
  return dtoToImage(imageDto);
}

export default { saveImage };
