export const UploadeImage =async (file: File) => {

    try{

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "pcakge_img_uploade");
        formData.append("cloud_name", "dqyfwfeed");
      
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dqyfwfeed/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
      
        const result = await res.json();
      
        if (!result.secure_url) {
          throw new Error("Upload failed");
        }
      
        return result.secure_url;
    }catch(error:any){
        throw new Error("Upload failed",error);
    }
};
