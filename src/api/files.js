import axiosClient from "../utils/axiosClient";

export async function uplaodFile(avatarFile) {
    try {
         const formData = new FormData();
                formData.append("file", avatarFile);

                const uploadRes = await axiosClient.post('/file/upload', formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
                return uploadRes;
    } catch (error) {
        throw error(error.response.data.message);
    }
}