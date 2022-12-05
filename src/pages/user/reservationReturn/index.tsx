import { useReservationReturn } from "@services";
import { useState } from "react";
import { BsPlusCircle } from "react-icons/bs";
import { useParams } from "react-router-dom";

export const ReservationReturnPage = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string>();
  const { reservationId } = useParams();

  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];
    if (!image) return;

    encodeFileToBase64(image);
    setImageFile(image);
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
          disabled={reservationId === null || imageFile === null}
          className="btn-primary btn w-full font-bold"
        >
          반납하기
        </button>
      </form>
    </div>
  );
};
