import { useEffect, useState } from "react"
import { ImageSize } from "./image"


export const useImageAddition = () =>{
  const [ image, setImage ] = useState({
    url: "",
    caption: ""
  })
  const [ imageSize, setImageSize ] = useState<ImageSize>("large")
  const [ imageFile, setImageFile ] = useState<File | null>(null)

  const handleImageAddition = ( file: File ) =>{
    const reader = new FileReader();

    reader.onloadend = ( readerEvent ) =>{
      const img = document.createElement("img");

      img.onload = ( imgEvent ) => {
        const canvas = document.createElement("canvas");
        switch(imageSize) {
          case "large": {
            canvas.height = 528;
            canvas.width = 896;
            const ctx = canvas.getContext("2d");
            ctx?.drawImage(img, 0, 0, 896, 528);

            break;
          }
          case "medium": {
            canvas.height = 464;
            canvas.width = 800;
            const ctx = canvas.getContext("2d");
            ctx?.drawImage(img, 0, 0, 800, 464);

            break;
          }
          case "small": {
            canvas.height = 400;
            canvas.width = 704;
            const ctx = canvas.getContext("2d");
            ctx?.drawImage(img, 0, 0, 704, 400);

            break;
          }
        }
        
        const url = canvas.toDataURL(file.type);
        setImage(prev => ({
          ...prev,
          url: url
        }))
      }

      img.src = readerEvent.target?.result as string;
    }

    if ( file ) {
      reader.readAsDataURL(file);
    }
  }

  const handleInputOnChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
    if ( event.target.files ) {
      setImageFile(event.target.files[0])
      handleImageAddition(event.target.files[0])
    }
  }

  const handleSizeChange = ( size: ImageSize ) =>{
    setImageSize(size)
  }

  const handleAddCaption = ( event: React.FocusEvent<HTMLInputElement, Element> ) => {
    const { value } = event.currentTarget
    setImage(prev => ({
      ...prev,
      caption: value
    }))
  }

  useEffect(() =>{
    if ( imageFile ) {
      handleImageAddition(imageFile)
    }
  }, [ imageSize ])

  return {
    image,
    handleInputOnChange,
    handleSizeChange,
    handleAddCaption
  }
}