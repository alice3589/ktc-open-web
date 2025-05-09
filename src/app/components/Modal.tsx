"use client";

type ContentType = "greeting" | "schedule" | "map" | "notice";

interface ModalProps {
  selectedContent: ContentType | null;
  onClose: () => void;
}

export const Modal = ({ selectedContent, onClose }: ModalProps) => {
  const renderContent = () => {
    if (!selectedContent) return null;

    switch (selectedContent) {
      case "greeting":
        return (
          <div className="p-3 sm:p-4">
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">学校長挨拶</h2>
            <p className="text-sm sm:text-base">すごそうなことをかく</p>
          </div>
        );
      case "schedule":
        return (
          <div className="p-3 sm:p-4">
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">スケジュール</h2>
            <ul className="list-disc pl-4 text-sm sm:text-base">
              <li>4月1日：それっぽいよてい</li>
              <li>4月1日：それっぽいよてい</li>
              <li>4月1日：それっぽいよてい</li>
            </ul>
          </div>
        );
      case "map":
        return (
          <div className="p-3 sm:p-4">
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">キャンバスマップ</h2>
            <p className="text-sm sm:text-base">きゃんばすまっぷをひょうじする</p>
          </div>
        );
      case "notice":
        return (
          <div className="p-3 sm:p-4">
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">連絡事項</h2>
            <ul className="list-disc pl-4 text-sm sm:text-base">
              <li>それっぽいよてい</li>
              <li>それっぽいよてい</li>
              <li>それっぽいよてい</li>
            </ul>
          </div>
        );
      default:
        return null;
    }
  };

  if (!selectedContent) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <div className="flex justify-between items-center p-3 sm:p-4 border-b">
          <h2 className="text-lg sm:text-xl font-bold">
            {selectedContent === "greeting" && "学校長挨拶"}
            {selectedContent === "schedule" && "スケジュール"}
            {selectedContent === "map" && "キャンバスマップ"}
            {selectedContent === "notice" && "連絡事項"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ✕
          </button>
        </div>
        {renderContent()}
      </div>
    </div>
  );
}; 