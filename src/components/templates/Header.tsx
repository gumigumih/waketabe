import waketabeSvg from "../../assets/logo-white.svg";

export const Header = () => {
  return (
    <>
      <div className="flex justify-center mb-4">
        <img src={waketabeSvg} alt="わけたべ" className="w-1/2" />
      </div>
      <p className="text-sm text-gray-50 text-center">
        いろんな料理をみんなで分け合って食べた時の
        <br />
        「食べた分だけ割り勘」を簡単に計算できるアプリです
      </p>
    </>
  );
};
