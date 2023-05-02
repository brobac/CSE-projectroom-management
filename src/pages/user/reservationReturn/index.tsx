import { useReservationReturn } from "@services";
import { useState } from "react";
import { BsPlusCircle } from "react-icons/bs";
import { useParams } from "react-router-dom";
import imageCompression from "browser-image-compression";
import { twMerge } from "tailwind-merge";
export const ReservationReturnPage = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string>();
  const { reservationId } = useParams();

  const onChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];
    if (!image) return;

    compressImage(image).then((res) => {
      encodeFileToBase64(res);
      setImageFile(res);
    });
  };

  const encodeFileToBase64 = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result as string);
      };
    });
  };

  const compressImage = async (image: File) => {
    const options = {
      maxSizeMB: 1, // 허용하는 최대 사이즈 지정
      maxWidthOrHeight: 1920, // 허용하는 최대 width, height 값 지정
      useWebWorker: true, // webworker 사용 여부
    };
    const compressedFile = await imageCompression(image!, options);
    return compressedFile;
  };

  const { mutate: reservationReturn, isLoading } = useReservationReturn();

  const onSubmitReturn = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData();
    formData.append("cleanupPhoto", imageFile!);

    e.preventDefault();
    reservationReturn({ reservationId: +reservationId!, data: formData });
  };

  return (
    <div className="flex w-full max-w-xl flex-col items-center gap-4 pt-4">
      <form
        className="flex h-full w-full flex-col items-center justify-center gap-4 py-4"
        onSubmit={(e) => onSubmitReturn(e)}
      >
        <p className="font-bold">사용한 자리의 사진을 찍어서 올려주세요</p>
        <label className=" border-base-400 aspect-square w-full cursor-pointer overflow-hidden border">
          {imageSrc ? (
            <img
              className=" w-full object-contain"
              src={imageSrc}
              alt="반납사진"
            />
          ) : (
            <div className=" flex h-full w-full flex-col items-center justify-center bg-base-200">
              <BsPlusCircle size={60} />
            </div>
          )}

          <input
            onChange={(e) => onChangeImage(e)}
            type="file"
            name="return-image"
            className="hidden"
          />
        </label>
        <button
          disabled={reservationId === null || imageFile === null || isLoading}
          className={twMerge([
            "btn-primary btn w-full font-bold",
            isLoading && "loading",
          ])}
        >
          반납하기
        </button>
      </form>
    </div>
  );
};
