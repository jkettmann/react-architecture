import UserApi from "./api";
import { dtoToImage } from "./transform";

async function saveImage(file: File) {
  const formData = new FormData();
  formData.append("image", file);
  const { data: imageDto } = await UserApi.uploadImage(formData);
  return dtoToImage(imageDto);
}

export default { saveImage };
